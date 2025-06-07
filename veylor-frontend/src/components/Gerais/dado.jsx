'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { Decal, useTexture } from '@react-three/drei';
import gsap from "gsap";
import * as THREE from 'three';

function BordasDoDado() {
  const edgesRef = useRef();

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: '#ffffff', linewidth: 2 });
    const lines = new THREE.LineSegments(edges, material);
    edgesRef.current.add(lines);
  }, []);

  return <group ref={edgesRef} />;
}

// 🔍 Hook para calcular as dimensões reais visíveis pela câmera
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

function DadoModel({ rodar, setRodar }) {
  const groupRef = useRef();
  const velocity = useRef(new THREE.Vector3());
  const angularVelocity = useRef(new THREE.Vector3());
  const rolling = useRef(false);
  const scale = useRef(1);
  const glyphs = useTexture([
    '/glyphs/glyph_1.png',
    '/glyphs/glyph_2.png',
    '/glyphs/glyph_3.png',
    '/glyphs/glyph_4.png',
    '/glyphs/glyph_5.png',
    '/glyphs/glyph_6.png',
    '/glyphs/glyph_7.png',
    '/glyphs/glyph_8.png',
    '/glyphs/glyph_9.png',
    '/glyphs/glyph_10.png',
    '/glyphs/glyph_11.png',
    '/glyphs/glyph_12.png',
    '/glyphs/glyph_13.png',
    '/glyphs/glyph_14.png',
    '/glyphs/glyph_15.png',
    '/glyphs/glyph_16.png',
    '/glyphs/glyph_17.png',
    '/glyphs/glyph_18.png',
    '/glyphs/glyph_19.png',
    '/glyphs/glyph_20.png',
  ]);

  const { width, height } = useViewportUnits(); // Pega os limites reais do viewport

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

  // Rebater nas laterais
  const boundsX = width / 2;
  const boundsY = height / 2;
  const radius = 0.8;

  if (Math.abs(obj.position.x) + radius > boundsX) {
    velocity.current.x *= -0.7;
    obj.position.x = Math.sign(obj.position.x) * (boundsX - radius);
  }

  if (Math.abs(obj.position.y) + radius > boundsY) {
    velocity.current.y *= -0.7;
    obj.position.y = Math.sign(obj.position.y) * (boundsY - radius);
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
  setRodar(false);

  // 🟣 Roda suavemente pra uma posição estável (simula cair em uma face)
  const finalRotation = {
    x: Math.round(obj.rotation.x / (Math.PI / 2)) * (Math.PI / 2),
    y: Math.round(obj.rotation.y / (Math.PI / 2)) * (Math.PI / 2),
    z: Math.round(obj.rotation.z / (Math.PI / 2)) * (Math.PI / 2),
  };

  gsap.to(obj.rotation, {
    duration: 1.6,
    x: finalRotation.x,
    y: finalRotation.y,
    z: finalRotation.z,
    ease: "power2.out"
  });
}
});



useEffect(() => {
  if (rodar && groupRef.current) {
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
    <group ref={groupRef}>
      <mesh scale={1.52} position-z={0}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={'#7e22ce'} transparent opacity={0.2} />
      </mesh>
<mesh scale={1.5} position-z={0}>
  <icosahedronGeometry args={[1, 0]} />
  <meshStandardMaterial
    color={'#4c1d95'}
    transparent
    opacity={1}
    metalness={0.9}
    roughness={0.2}
    emissive={'#4c1d95'}
    emissiveIntensity={1.2}
    flatShading={true}
  />
  
  {faceData.map((face, i) => (
    <Decal
      key={i}
      map={glyphs[i]}
      position={face.position}
      direction={face.normal}
      scale={0.5}
      flatShading
    />
  ))}
</mesh>

      <BordasDoDado />
      <pointLight position={[0, 0, 0]} intensity={2} color="#9333ea" distance={6} />
      <Sparkles count={40} speed={1.2} scale={3} size={4} color="#e879f9" />
    </group>
  );
}

export default function DadoD20({ valor }) {
  const divRef = useRef(null);
  const [rodar, setRodar] = useState(false);

  const handleRolar = () => setRodar(true);

  return (
    <div ref={divRef} className="w-full h-full relative flex flex-col items-center">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 5]} intensity={1.5} />
        <DadoModel rodar={rodar} setRodar={setRodar} />
        <ParedesVisuais />
        <axesHelper args={[5]} />
        <gridHelper args={[10, 10]} />
      </Canvas>

      <button
        className="absolute bg-violet-700 hover:bg-violet-800 text-white px-4 py-2 rounded"
        onClick={handleRolar}
      >
        Rolar Dado
      </button>

    </div>
  );
}
