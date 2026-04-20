interface PopInTextProps {
  text: string;
  delay?: number;
}

export function PopInText({ text, delay = 0 }: PopInTextProps) {
  const words = text.split(' ');
  
  // Always render immediately with animation
  
  return (
    <span>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="inline-block opacity-0 animate-[popIn_0.6s_cubic-bezier(0.68,-0.55,0.265,1.55)_forwards]"
          style={{ 
            animationDelay: `${delay + (i * 0.1)}s`,
            animationFillMode: 'forwards',
          }}
        >
          {word}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
