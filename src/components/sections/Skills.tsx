"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variants } from "@/lib/animations";

interface Skill {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools";
  proficiency: number;
  connections: string[];
}

const skills: Skill[] = [
  { id: "react", name: "React", category: "frontend", proficiency: 5, connections: ["nextjs", "typescript", "tailwind", "framer"] },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 5, connections: ["react", "typescript", "nodejs"] },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 4, connections: ["react", "nextjs", "nodejs"] },
  { id: "tailwind", name: "Tailwind", category: "frontend", proficiency: 5, connections: ["react", "framer"] },
  { id: "framer", name: "Framer Motion", category: "frontend", proficiency: 4, connections: ["react", "tailwind"] },
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 4, connections: ["nextjs", "typescript", "postgres", "redis"] },
  { id: "postgres", name: "PostgreSQL", category: "backend", proficiency: 4, connections: ["nodejs", "prisma"] },
  { id: "prisma", name: "Prisma", category: "backend", proficiency: 4, connections: ["postgres", "nodejs"] },
  { id: "redis", name: "Redis", category: "backend", proficiency: 3, connections: ["nodejs"] },
  { id: "fastapi", name: "FastAPI", category: "backend", proficiency: 3, connections: ["postgres"] },
  { id: "git", name: "Git", category: "tools", proficiency: 5, connections: ["cicd", "docker"] },
  { id: "docker", name: "Docker", category: "tools", proficiency: 4, connections: ["git", "aws", "cicd"] },
  { id: "cicd", name: "CI/CD", category: "tools", proficiency: 4, connections: ["git", "docker", "aws"] },
  { id: "aws", name: "AWS", category: "tools", proficiency: 3, connections: ["docker", "cicd", "linux"] },
  { id: "linux", name: "Linux", category: "tools", proficiency: 4, connections: ["aws", "docker"] },
];

const categoryColors = {
  frontend: { primary: "#3b82f6", glow: "rgba(59, 130, 246, 0.5)" },
  backend: { primary: "#10b981", glow: "rgba(16, 185, 129, 0.5)" },
  tools: { primary: "#a855f7", glow: "rgba(168, 85, 247, 0.5)" },
};

const calculatePositions = (skills: Skill[], width: number, height: number) => {
  const positions: Record<string, { x: number; y: number }> = {};
  const centerX = width / 2;
  const centerY = height / 2;
  
  const frontend = skills.filter(s => s.category === "frontend");
  const backend = skills.filter(s => s.category === "backend");
  const tools = skills.filter(s => s.category === "tools");
  
  frontend.forEach((skill, i) => {
    const angle = (Math.PI * 0.8) + (i / (frontend.length - 1 || 1)) * (Math.PI * 0.6);
    const radius = 160 + (i % 2) * 40;
    positions[skill.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius * 0.7,
    };
  });
  
  backend.forEach((skill, i) => {
    const angle = (Math.PI * -0.4) + (i / (backend.length - 1 || 1)) * (Math.PI * 0.6);
    const radius = 160 + (i % 2) * 40;
    positions[skill.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius * 0.7,
    };
  });
  
  tools.forEach((skill, i) => {
    const angle = (Math.PI * 0.3) + (i / (tools.length - 1 || 1)) * (Math.PI * 0.4);
    const radius = 180 + (i % 2) * 30;
    positions[skill.id] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius * 0.8,
    };
  });
  
  return positions;
};

const NeuralConnection = memo(({ 
  from, 
  to, 
  isActive, 
  isHighlighted,
  pulseDelay,
}: { 
  from: { x: number; y: number }; 
  to: { x: number; y: number }; 
  isActive: boolean;
  isHighlighted: boolean;
  pulseDelay: number;
}) => {
  return (
    <g>
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="white"
        strokeWidth={isHighlighted ? 2 : 1}
        initial={{ opacity: 0.1 }}
        animate={{ 
          opacity: isHighlighted ? 0.6 : isActive ? 0.05 : 0.15,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {(isHighlighted || !isActive) && (
        <motion.circle
          r={3}
          fill="white"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: pulseDelay,
            ease: "linear",
          }}
          style={{
            offsetPath: `path("M ${from.x} ${from.y} L ${to.x} ${to.y}")`,
          }}
        />
      )}
    </g>
  );
});

NeuralConnection.displayName = "NeuralConnection";

const NeuralNode = memo(({
  skill,
  position,
  isSelected,
  isConnected,
  isActive,
  onHover,
  onClick,
  animationIndex,
  reverseAnimationIndex,
  isInView,
}: {
  skill: Skill;
  position: { x: number; y: number };
  isSelected: boolean;
  isConnected: boolean;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  animationIndex: number;
  reverseAnimationIndex: number;
  isInView: boolean;
}) => {
  const colors = categoryColors[skill.category];
  const size = 28 + skill.proficiency * 6;
  const dimmed = isActive && !isSelected && !isConnected;
  
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(skill.id)}
    >
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size / 2 + 10}
        fill={colors.glow}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { 
          opacity: isSelected ? 0.6 : isConnected ? 0.3 : 0.1,
          scale: isSelected ? 1.2 : 1,
        } : {
          opacity: 0,
          scale: 0,
        }}
        transition={{ 
          duration: 0.4,
          delay: isInView ? animationIndex * 0.08 : reverseAnimationIndex * 0.05,
        }}
        filter="blur(8px)"
      />
      
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={size / 2}
        fill="#0a0a0a"
        stroke={colors.primary}
        strokeWidth={isSelected ? 3 : 2}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { 
          scale: isSelected ? 1.15 : 1,
          opacity: dimmed ? 0.3 : 1,
        } : {
          scale: 0,
          opacity: 0,
        }}
        whileHover={isInView ? { scale: 1.1 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 15,
          delay: isInView ? animationIndex * 0.08 : reverseAnimationIndex * 0.05,
        }}
      />
      
      {skill.name.length > 10 ? (
        <>
          <motion.text
            x={position.x}
            y={position.y - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={8}
            fontWeight={600}
            style={{ pointerEvents: "none", userSelect: "none" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: dimmed ? 0.3 : 1 } : { opacity: 0 }}
            transition={{ 
              delay: isInView ? (animationIndex * 0.08) + 0.2 : (reverseAnimationIndex * 0.05),
              duration: 0.2,
            }}
          >
            {skill.name.split(' ')[0]}
          </motion.text>
          <motion.text
            x={position.x}
            y={position.y + 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={8}
            fontWeight={600}
            style={{ pointerEvents: "none", userSelect: "none" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: dimmed ? 0.3 : 1 } : { opacity: 0 }}
            transition={{ 
              delay: isInView ? (animationIndex * 0.08) + 0.2 : (reverseAnimationIndex * 0.05),
              duration: 0.2,
            }}
          >
            {skill.name.split(' ').slice(1).join(' ')}
          </motion.text>
        </>
      ) : (
        <motion.text
          x={position.x}
          y={position.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={skill.name.length > 8 ? 9 : 11}
          fontWeight={600}
          style={{ pointerEvents: "none", userSelect: "none" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: dimmed ? 0.3 : 1 } : { opacity: 0 }}
          transition={{ 
            delay: isInView ? (animationIndex * 0.08) + 0.2 : (reverseAnimationIndex * 0.05),
            duration: 0.2,
          }}
        >
          {skill.name}
        </motion.text>
      )}
    </motion.g>
  );
});

NeuralNode.displayName = "NeuralNode";

function SkillsComponent() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  
  const activeSkill = hoveredSkill || selectedSkill;
  
  const width = 700;
  const height = 500;
  
  const positions = useMemo(() => calculatePositions(skills, width, height), []);
  
  const animationOrder = useMemo(() => {
    const order: Record<string, number> = {};
    const sortedSkills = [...skills].sort((a, b) => {
      const posA = positions[a.id];
      const posB = positions[b.id];
      return posA.x - posB.x;
    });
    sortedSkills.forEach((skill, index) => {
      order[skill.id] = index;
    });
    return order;
  }, [positions]);
  
  const reverseAnimationOrder = useMemo(() => {
    const order: Record<string, number> = {};
    const sortedSkills = [...skills].sort((a, b) => {
      const posA = positions[a.id];
      const posB = positions[b.id];
      return posB.x - posA.x;
    });
    sortedSkills.forEach((skill, index) => {
      order[skill.id] = index;
    });
    return order;
  }, [positions]);
  
  const pulseDelays = useMemo(() => {
    const delays: Record<string, number> = {};
    let index = 0;
    skills.forEach(skill => {
      skill.connections.forEach(connId => {
        const key = [skill.id, connId].sort().join("-");
        if (!delays[key]) {
          delays[key] = (index * 0.3) % 2;
          index++;
        }
      });
    });
    return delays;
  }, []);
  
  const connections = useMemo(() => {
    const conns: { from: string; to: string; key: string }[] = [];
    const seen = new Set<string>();
    
    skills.forEach(skill => {
      skill.connections.forEach(connId => {
        const key = [skill.id, connId].sort().join("-");
        if (!seen.has(key)) {
          seen.add(key);
          conns.push({ from: skill.id, to: connId, key });
        }
      });
    });
    
    return conns;
  }, []);
  
  const getConnectedSkills = useCallback((skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill ? new Set([skillId, ...skill.connections]) : new Set<string>();
  }, []);
  
  const connectedSet = activeSkill ? getConnectedSkills(activeSkill) : new Set<string>();
  
  const handleClick = useCallback((id: string) => {
    setSelectedSkill(prev => prev === id ? null : id);
  }, []);

  const activeSkillData = activeSkill ? skills.find(s => s.id === activeSkill) : null;

  return (
    <section id="skills" className="w-full py-24 px-6">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants.staggerContainer}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={variants.fadeInUp} className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Neural Network</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            An interconnected system of technologies. Hover to explore relationships.
          </p>
        </motion.div>

        <motion.div 
          variants={variants.fadeInUp}
          className="flex justify-center gap-6 mb-8"
        >
          {Object.entries(categoryColors).map(([category, colors]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors.primary }}
              />
              <span className="text-xs text-secondary capitalize">{category}</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          variants={variants.fadeInUp}
          className="relative flex justify-center"
          initial="initial"
          whileInView="animate"
          viewport={{ margin: "-200px" }}
          onViewportEnter={() => setIsInView(true)}
          onViewportLeave={() => setIsInView(false)}
        >
          <svg 
            width={width} 
            height={height} 
            viewBox={`0 0 ${width} ${height}`}
            className="max-w-full h-auto"
          >
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                delay: isInView ? (skills.length * 0.08) + 0.3 : 0,
                duration: isInView ? 0.6 : 0.3,
              }}
            >
              {connections.map(({ from, to, key }) => {
                const fromPos = positions[from];
                const toPos = positions[to];
                if (!fromPos || !toPos) return null;
                
                const isHighlighted = activeSkill ? 
                  (connectedSet.has(from) && connectedSet.has(to)) : false;
                
                return (
                  <NeuralConnection
                    key={key}
                    from={fromPos}
                    to={toPos}
                    isActive={!!activeSkill}
                    isHighlighted={isHighlighted}
                    pulseDelay={pulseDelays[key] || 0}
                  />
                );
              })}
            </motion.g>
            
            <g>
              {skills.map((skill) => (
                <NeuralNode
                  key={skill.id}
                  skill={skill}
                  position={positions[skill.id]}
                  isSelected={activeSkill === skill.id}
                  isConnected={connectedSet.has(skill.id)}
                  isActive={!!activeSkill}
                  onHover={setHoveredSkill}
                  onClick={handleClick}
                  animationIndex={animationOrder[skill.id]}
                  reverseAnimationIndex={reverseAnimationOrder[skill.id]}
                  isInView={isInView}
                />
              ))}
            </g>
          </svg>

          <AnimatePresence>
            {activeSkillData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-center min-w-[200px]"
              >
                <div 
                  className="text-lg font-bold mb-1"
                  style={{ color: categoryColors[activeSkillData.category].primary }}
                >
                  {activeSkillData.name}
                </div>
                <div className="text-xs text-secondary capitalize mb-2">
                  {activeSkillData.category}
                </div>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <div
                      key={level}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: level <= activeSkillData.proficiency 
                          ? categoryColors[activeSkillData.category].primary 
                          : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-secondary mt-2">
                  {activeSkillData.connections.length} connections
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="lg:hidden mt-8 grid grid-cols-3 gap-3">
          {skills.map(skill => (
            <motion.div
              key={skill.id}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
              style={{ borderColor: `${categoryColors[skill.category].primary}30` }}
            >
              <div className="text-xs font-medium">{skill.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export const Skills = memo(SkillsComponent);
