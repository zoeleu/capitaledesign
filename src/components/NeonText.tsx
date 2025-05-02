interface NeonTextProps {
  id: string;
  text: string;
  color: string;
  fontSize: string;
  fontWeight?: number;
  fontFamily?: string;
  background?: string;
  className?: string;
}

export function NeonText(props: NeonTextProps) {
  const { text, color, fontSize, fontWeight = 400, fontFamily = 'Arial' } = props;

  const neonStyle = {
    color: color,
    fontSize: `${fontSize}`,
    fontWeight: fontWeight,
    fontFamily: fontFamily,
    textShadow: `0 0 12px ${color}`,
    width: 'fit-content',
    touchAction: 'none',
    cursor: 'grab',
    background: props.background || 'transparent',
  };

  return (
    <div style={neonStyle} className={props.className}>
      {text}
    </div>
  );
}