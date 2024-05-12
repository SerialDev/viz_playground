import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    camera.position.z = 20;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    const nodes = [];
    const nodeMaterials = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    // Initial setup of nodes
    for (let i = 0; i < 5; i++) {
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphere = new THREE.Mesh(sphereGeometry, nodeMaterials);
      sphere.position.x = i * 3 - 6;
      scene.add(sphere);
      nodes.push(sphere);
    }

    // Connect nodes with lines
    let line = new THREE.Line();
    const updateConnections = () => {
      scene.remove(line); // Remove old line
      const points = nodes.map((node) => node.position);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff });
      line = new THREE.Line(geometry, material);
      scene.add(line);
    };

    updateConnections();

    // Function to update node arrangement randomly
    const updateNodes = () => {
      const action = Math.random() > 0.5 ? "add" : "remove";
      if (action === "add") {
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphere = new THREE.Mesh(sphereGeometry, nodeMaterials);
        sphere.position.x = (nodes.length % 5) * 3 - 6;
        scene.add(sphere);
        nodes.push(sphere);
      } else if (nodes.length > 1) {
        const nodeToRemove = nodes.pop();
        scene.remove(nodeToRemove);
      }
      updateConnections();
    };

    const intervalId = setInterval(updateNodes, 1000);

    const renderScene = () => {
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(renderScene);
    };

    renderScene();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      nodes.forEach((node) => scene.remove(node));
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeScene;
