  'use client';

  import { Canvas, useFrame, useThree } from '@react-three/fiber';
  import { useRef, useEffect, useState} from 'react';
  import { Text } from '@react-three/drei'; 
  import React from 'react';
  import { Environment } from '@react-three/drei';
  import * as THREE from 'three';
  import { motion, AnimatePresence} from "framer-motion";

  function BordasDoDado() {
    const edgesRef = useRef();

    useEffect(() => {
      const geometry = new THREE.IcosahedronGeometry(1.5, 0);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ color: '#9333EA', linewidth: 2, transparent: true, opacity: 0.3 });
      const lines = new THREE.LineSegments(edges, material);
      edgesRef.current.add(lines);
    }, []);

    return <group ref={edgesRef} />;
  }

  function useViewportUnits() {
    const { camera, size } = useThree();
    const vFov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * camera.position.z;
    const width = height * (size.width / size.height);
    return { width, height };
  }

  function ParedesVisuais() {
    const { width, height } = useViewportUnits();
    const espessura = 0.05;

    return (
      <>
        {/* Superior (vermelho) */}
        <mesh position={[0, (height / 2) - (espessura / 2), 0]}>
          <boxGeometry args={[width, espessura, 0.1]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
        </mesh>

        {/* Inferior (verde) */}
        <mesh position={[0, (-height / 2) + (espessura / 2), 0]}>
          <boxGeometry args={[width, espessura, 0.1]} />
          <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1.5} />
        </mesh>

        {/* Direita (azul) */}
        <mesh position={[(width / 2) - (espessura / 2), 0, 0]}>
          <boxGeometry args={[espessura, height, 0.1]} />
          <meshStandardMaterial color="#0000ff" emissive="#0000ff" emissiveIntensity={1.5} />
        </mesh>

        {/* Esquerda (amarelo) */}
        <mesh position={[(-width / 2) + (espessura / 2), 0, 0]}>
          <boxGeometry args={[espessura, height, 0.1]} />
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={1.5} />
        </mesh>
      </>
    );
  }

  function DadoModel({ rodar, setRodando}) {
    const groupRef = useRef();
    const velocity = useRef(new THREE.Vector3());
    const angularVelocity = useRef(new THREE.Vector3());
    const rolling = useRef(false);
    const scale = useRef(1);

    const simbolos = [
      "⟁", "⚚", "⚘", "☤", "✶",
      "☬", "♄", "☉", "☾", "☿",
      "⚡", "✦", "⚸", "✨", "🕳️",
      "🌿", "🪨", "❄️", "🌊", "🔥"
    ];

    const { width, height } = useViewportUnits();

    useFrame(() => {
      if (!groupRef.current || !rolling.current) return;

      const obj = groupRef.current;

      // Atualiza posição horizontal (plano)
      obj.position.x += velocity.current.x;
      obj.position.y += velocity.current.y;

      // Altura (Z)
      obj.position.z += velocity.current.z;
      velocity.current.z -= 0.02; // gravidade mais forte

      // Rebater no chão (Z = altura)
      if (obj.position.z <= 0) {
        obj.position.z = 0;

        if (Math.abs(velocity.current.z) > 0.1) {
          // Quica, mas converte parte da força em giro
          velocity.current.z *= -0.5;

          // Conversão de impacto em rotação e impulso horizontal (rolagem)
          angularVelocity.current.x += (Math.random() - 0.5) * 0.4;
          angularVelocity.current.y += (Math.random() - 0.5) * 0.4;
          angularVelocity.current.z += (Math.random() - 0.5) * 0.4;

          velocity.current.x += (Math.random() - 0.5) * 0.05;
          velocity.current.y += (Math.random() - 0.5) * 0.05;
        } else {
          velocity.current.z = 0;
        }
      }

      const boundsX = width / 2;
      const boundsY = height / 2;
      const radius = 1.5 * scale.current; // raio real com base na escala atual

      if (obj.position.x + radius > boundsX) {
        obj.position.x = boundsX - radius;
        velocity.current.x *= -0.7;
      }

      if (obj.position.x - radius < -boundsX) {
        obj.position.x = -boundsX + radius;
        velocity.current.x *= -0.7;
      }

      if (obj.position.y + radius > boundsY) {
        obj.position.y = boundsY - radius;
        velocity.current.y *= -0.7;
      }

      if (obj.position.y - radius < -boundsY) {
        obj.position.y = -boundsY + radius;
        velocity.current.y *= -0.7;
      }


      // Aplica rotação
      obj.rotation.x += angularVelocity.current.x;
      obj.rotation.y += angularVelocity.current.y;
      obj.rotation.z += angularVelocity.current.z;

      // Desaceleração com mais força no plano (x/y) se Z = 0 (pra evitar deslizar)
      const fator = obj.position.z <= 0.01 ? 0.9 : 0.985;
      velocity.current.x *= fator;
      velocity.current.y *= fator;
      angularVelocity.current.multiplyScalar(0.97);

      // Escala suavemente
      const targetScale = 0.7;
      if (scale.current > targetScale) {
        scale.current -= 0.01;
        if (scale.current < targetScale) scale.current = targetScale;
      }
      obj.scale.set(scale.current, scale.current, scale.current);

      // Parar rolagem
      if (
      velocity.current.length() < 0.004 &&
      angularVelocity.current.length() < 0.004 &&
      obj.position.z <= 0.002
    ) {
      rolling.current = false;
      setRodando(false)
    }
    });

    useEffect(() => {
      if (rodar && groupRef.current) {
        setRodando(true);
        const obj = groupRef.current;

        obj.position.set(0, 0, 1); // altura inicial (Z)
        obj.rotation.set(0, 0, 0);
        scale.current = 1;
        obj.scale.set(scale.current, scale.current, scale.current);

        velocity.current.set(
          Math.random() * 0.9 - 0.3, // x (mais forte)
          Math.random() * 0.9 - 0.3, // y (mais forte)
          Math.random() * 0.2 + 0.2  // z (altura)
        );

        angularVelocity.current.set(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        );

        rolling.current = true;
      }
    }, [rodar]);

    const faceData = [
      { position: [-0.873, 0.873, 0.873], normal: [-0.577, 0.577, 0.577] },
      { position: [0.0, 1.412, 0.539], normal: [0.0, 0.934, 0.357] },
      { position: [0.0, 1.412, -0.539], normal: [0.0, 0.934, -0.357] },
      { position: [-0.873, 0.873, -0.873], normal: [-0.577, 0.577, -0.577] },
      { position: [-1.412, 0.539, 0.0], normal: [-0.934, 0.357, 0.0] },
      { position: [0.873, 0.873, 0.873], normal: [0.577, 0.577, 0.577] },
      { position: [-0.539, 0.0, 1.412], normal: [-0.357, 0.0, 0.934] },
      { position: [-1.412, -0.539, 0.0], normal: [-0.934, -0.357, 0.0] },
      { position: [-0.539, 0.0, -1.412], normal: [-0.357, 0.0, -0.934] },
      { position: [0.873, 0.873, -0.873], normal: [0.577, 0.577, -0.577] },
      { position: [0.873, -0.873, 0.873], normal: [0.577, -0.577, 0.577] },
      { position: [0.0, -1.412, 0.539], normal: [0.0, -0.934, 0.357] },
      { position: [0.0, -1.412, -0.539], normal: [0.0, -0.934, -0.357] },
      { position: [0.873, -0.873, -0.873], normal: [0.577, -0.577, -0.577] },
      { position: [1.412, -0.539, 0.0], normal: [0.934, -0.357, 0.0] },
      { position: [0.539, 0.0, 1.412], normal: [0.357, 0.0, 0.934] },
      { position: [-0.873, -0.873, 0.873], normal: [-0.577, -0.577, 0.577] },
      { position: [-0.873, -0.873, -0.873], normal: [-0.577, -0.577, -0.577] },
      { position: [0.539, 0.0, -1.412], normal: [0.357, 0.0, -0.934] },
      { position: [1.412, 0.539, 0.0], normal: [0.934, 0.357, 0.0] },
    ];

    return (
      <>
      <group ref={groupRef}>
        <mesh scale={1.52} position-z={0}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={'#9333EA'} transparent opacity={0.2} depthWrite={false} />
        </mesh>

        <mesh scale={1.5} position-z={0}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9333EA"
            emissive="A03BFC" 
            emissiveIntensity={0.02}
            transparent
            opacity={0.9}
            metalness={0.8}
            roughness={0.2}
            flatShading
          />
          
          {faceData.map((face, i) => {
            const pos = new THREE.Vector3(...face.position).multiplyScalar(0.53); // aproxima do centro da face
            const dir = new THREE.Vector3(...face.normal);
            const quaternion = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 0, 1), // direção padrão do texto
              dir.normalize() // rotaciona para alinhar à normal da face
            );

            return (
                <React.Fragment key={i}>
                {/* Sombra simulada */}
                <Text
                  key={i}
                  position={pos}
                  quaternion={quaternion}
                  fontSize={0.28}
                  color="#fff"
                  material-transparent
                  material-opacity={0.7}
                  outlineWidth={0.002}
                  outlineColor="#8b5cf6"
                  anchorX="center"
                  anchorY="middle"
                >
                  {simbolos[i]}
                </Text> 
                </React.Fragment>

            );
          })}
        </mesh>

        <BordasDoDado />
        <pointLight position={[0, 0, 0]} intensity={2} color="#9333ea" distance={6} />
      </group>
      </>
    );
  }

  function reconstruirQueryFormatada(query) {
    const valores = [...query.matchAll(/\[(\d+)\]/g)].map(m => Number(m[1]));
    const dados = [...query.matchAll(/(\d+)d(\d+)/g)];

    const elementos = [];
    const dadosExpandidos = [];

    // Expande cada dado (3d6 → [6,6,6])
    dados.forEach((match) => {
      const quantidade = Number(match[1]);
      const tipo = Number(match[2]);
      for (let i = 0; i < quantidade; i++) {
        dadosExpandidos.push(tipo);
      }
    });

    const regex = /\[(\d+)\]|\d+d\d+|\+|\d+|[^\s]/g;
    let valorIndex = 0;
    let match;

    while ((match = regex.exec(query)) !== null) {
      const token = match[0];

      if (/^\[\d+\]$/.test(token)) {
        const valor = valores[valorIndex];
        const tipo = dadosExpandidos[valorIndex];
        valorIndex++;

        let status = "normal";
        if (valor === 1) status = "falhaCritica";
        else if (valor === tipo) status = "sucessoCritico";

        const cor =
          status === "sucessoCritico"
            ? "text-[rgb(255,144,0)] drop-shadow-[0_0_3px_rgb(255,144,0)]"
            : status === "falhaCritica"
            ? "text-[rgba(234,51,51,1)] drop-shadow-[0_0_3px_rgb(234,51,51)]"
            : "text-[rgb(255,234,0)] drop-shadow-[0_0_3px_rgb(255,221,0)]";

        elementos.push(
          <motion.span
            key={match.index}
            className={cor}
            animate={
              status === "sucessoCritico"
                ? { textShadow: [`0px 0px 2px rgb(255,144,0)`, `0px 0px 3px rgb(255,144,0)`, `0px 0px 2px rgb(255,144,0)`] }
                : status === "falhaCritica"
                ? { scale: [1, 1.05, 1], textShadow: [`0px 0px 2px rgba(234,51,51,1)`, `0px 0px 3px rgba(234,51,51,1)`, `0px 0px 2px rgba(234,51,51,1)`] }
                : { textShadow: [`0px 0px 2px rgb(255,221,0)`, `0px 0px 3px rgb(255,221,0)`, `0px 0px 2px rgb(255,221,0)`] }
            }
            transition={{
              repeat: Infinity,
              duration: status === "normal" ? 2.5 : 1.2,
              ease: "easeInOut",
            }}
          >
            {" "}{token}{" "}
          </motion.span>
        );
      } else {
        elementos.push(
          <span key={match.index} className="text-[rgb(255,234,0)] drop-shadow-[0_0_1px_rgb(255,221,0)]">
            {" "}{token}{" "}
          </span>
        );
      }
    }

    return elementos;
  }

  function ResultadoDado({rodando, rolagem, setRodar}) {
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const corBase =
      rolagem.indicadorResultado === "sucessoCritico"
        ? "rgb(255,144,0)"          // laranja
        : rolagem.indicadorResultado === "falhaCritica"
        ? "rgba(234,51,51,1)"       // vermelho
        : "rgb(255,234,0)";         // amarelo

    useEffect(() => {
      if (!rodando) {
        const timer = setTimeout(() => setMostrarResultado(true), 300);
        return () => clearTimeout(timer);
      } else {
        setMostrarResultado(false);
      }
    }, [rodando]);

    return(
      <AnimatePresence>
        {!rodando && (
          <motion.div 
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: 1,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          exit={{
            scaleY: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          style={{ originY: 0.5 }} // ponto de origem no centro vertical
          className={`
            absolute z-1
            rounded-3xl border-t-1 border-b-1
            w-full h-full max-w-80 max-h-50
            flex flex-col justify-center items-center  
            space-y-2 
            ${rolagem.indicadorResultado === "sucessoCritico" ? "border-[rgba(255,144,0,0.8)]"
              : rolagem.indicadorResultado === "falhaCritica" ? "border-[rgba(234,51,51,0.8)] " 
              : "border-[rgba(255,234,0,0.8)]"}
          `}>
            <div
              className="
                absolute inset-0
                w-full h-full
                backdrop-blur-xs
                bg-[rgba(13,1,31,0.30)]
                rounded-3xl
                z-0
              "
            ></div>

            {mostrarResultado && (
              <>
                <motion.p
                  initial={{
                    scale: 0,
                    textShadow: `0px 0px 0px ${corBase}`,
                  }}
                  animate={{
                    scale: [0, 1.1, 1], // só uma vez
                    textShadow: [
                      `0px 0px 12px ${corBase}`,
                      `0px 0px 13px ${corBase}`,
                      `0px 0px 14px ${corBase}`,
                      `0px 0px 15px ${corBase}`,
                      `0px 0px 16px ${corBase}`,
                      `0px 0px 15px ${corBase}`,
                      `0px 0px 14px ${corBase}`,
                      `0px 0px 13px ${corBase}`,
                      `0px 0px 12px ${corBase}`,
                    ],
                  }}
                  transition={{
                    scale: {
                      duration: 0.5,
                      delay: 0.6,
                      ease: [0.4, 1.3, 0.6, 1],
                    },
                    textShadow: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    },
                  }}
                  className={`text-8xl font-bold tracking-wide z-1
                    ${rolagem.indicadorResultado === "sucessoCritico"
                      ? "text-[rgb(255,144,0)]"
                      : rolagem.indicadorResultado === "falhaCritica"
                      ? "text-[rgba(234,51,51,1)]"
                      : "text-[rgb(255,234,0)]"
                    }`}
                >
                  {rolagem.resultado}
                </motion.p>

                <motion.p
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: [0, 1.05, 1],
                  }}
                  transition={{
                    scale: {
                      duration: 0.4,
                      delay: 0.4,
                      ease: [0.4, 1.3, 0.6, 1],
                    }
                  }}
                >
                  {reconstruirQueryFormatada(rolagem.query)}
                </motion.p>

                <motion.button onClick={() => setRodar(false)} 
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  style={{ originY: 0.5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                className="
                w-full max-w-50 z-1
                flex justify-center items-center
                py-2 px-6 gap-x-3
                text-white text-lg font-semibold
                border-t-1 border-b-1 border-[rgba(147,51,234,0.60)] rounded-lg
                cursor-pointer
                hover:border-[rgba(147,51,234,1)] hover:scale-105
                transition-all duration-200 ease-in-out transform
                group
                select-none
                ">
                  <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ originY: 0.5 }}
                  transition={{ duration: 0.1, delay: 0.2, ease: "easeInOut" }}
                  className='flex justify-center items-center gap-x-2'>
                    <p className="text-sm font-light group-hover:drop-shadow-[0_0_3px_rgb(147,51,234)] transition-all duration-200 ease-in-out transform">Fechar</p>
                  </motion.div>
                </motion.button>
              </>

            )}

          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  export default function DadoD20({ rolagem, rodar, setRodar }) {
    const divRef = useRef(null);
    const [rodando, setRodando] = useState(true)

    return (
      <div ref={divRef} className="relative w-full h-full relative flex flex-col items-center justify-center">
        <div className='
          absolute 
          w-full h-full
          flex justify-center items-center 
          bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.6)_60%,transparent_100%)]
          backdrop-blur-sm
        '>
        </div>

        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 5]} intensity={1.5} />
          <DadoModel rodar={rodar} setRodar={setRodar} setRodando={setRodando}/>
        </Canvas>

        <ResultadoDado rolagem={rolagem} setRodar={setRodar} rodando={rodando}/>

      </div>
    );
  }
