import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const LIME = "#C6FF63";

function Core({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const n = mobile ? 350 : 900;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 2.4 + Math.random() * 3.2;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, [mobile]);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const scroll = typeof window !== "undefined" ? Math.min(window.scrollY / window.innerHeight, 1) : 0;
    const k = 1 - Math.exp(-3 * dt);
    g.rotation.y += dt * 0.08;
    g.rotation.x += (state.pointer.y * 0.25 - g.rotation.x) * k;
    g.position.x += (state.pointer.x * 0.25 - g.position.x) * k;
    g.position.y = -scroll * 1.5;
    g.scale.setScalar(1 - scroll * 0.25);
    if (inner.current) inner.current.rotation.z -= dt * 0.2;
    if (rings.current) rings.current.rotation.y -= dt * 0.05;
  });

  return (
    <group ref={group}>
      <mesh castShadow>
        <icosahedronGeometry args={[1.3, mobile ? 3 : 6]} />
        <meshStandardMaterial color="#9a9e96" metalness={1} roughness={0.28} flatShading />
      </mesh>
      <mesh ref={inner} scale={1.42}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={LIME} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.7, 0.012, 8, 160]} />
        <meshStandardMaterial color={LIME} emissive={LIME} emissiveIntensity={1.4} />
      </mesh>
      <group ref={rings}>
        {[2.3, 2.9, 3.6].map((r, i) => (
          <mesh key={r} rotation={[Math.PI / 2 + 0.3 * (i - 1), 0.4 * i, 0]}>
            <torusGeometry args={[r, 0.004, 6, 200]} />
            <meshBasicMaterial color="#F0F1EB" transparent opacity={0.22} />
          </mesh>
        ))}
        <mesh position={[2.3, 0, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={LIME} />
        </mesh>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#F0F1EB" transparent opacity={0.55} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroOrb() {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 7.5], fov: 40 }} style={{ pointerEvents: "none" }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 5, 3]} intensity={2} />
      <pointLight position={[-3, -2, 2]} color={LIME} intensity={6} />
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 3, 1]} />
        <Lightformer intensity={0.8} position={[-5, 0, 0]} rotation-y={Math.PI / 2} scale={[10, 1, 1]} />
        <Lightformer intensity={0.5} color={LIME} position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[6, 0.4, 1]} />
      </Environment>
      <Core mobile={mobile} />
    </Canvas>
  );
}
