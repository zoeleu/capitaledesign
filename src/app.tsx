import { useEffect, useState } from 'react';
import './app.scss';
import { NeonText } from './components/NeonText'
import { Form, Select, ToggleGroup } from 'radix-ui';
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon, ArrowDownIcon, ChevronUpIcon, ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';


const colors = [
  {
    name: 'Rouge',
    value: '#ff0000',
  },
  {
    name: 'Vert',
    value: '#00ff00',
  },
  {
    name: 'Bleu',
    value: '#0000ff',
  },
  {
    name: 'Jaune',
    value: '#ffff00',
  },
  {
    name: 'Violet',
    value: '#800080',
  }
]

const fonts = [
  {
    label: 'Arial',
    value: 'Arial, sans-serif',
  },
  {
    label: 'League Script',
    value: '"League Script", sans-serif',
  },
  {
    label: 'Limelight',
    value: 'Limelight, serif',
  },
  {
    label: 'Orbitron',
    value: '"Orbitron", Times, serif',
  },
  {
    label: 'Borel',
    value: 'Borel, sans-serif',
  }
]


export function App() {

  const [textAlignment, setTextAlignment] = useState<string>('center');
  const [text, setText] = useState<string>('Votre texte ici');
  const [color, setColor] = useState<string>(colors[0].value);
  const [tubeColor, setTubeColor] = useState<string>('white');
  const [size, setSize] = useState<string>('M');
  const [support, setSupport] = useState<string>('minimalist');
  const [usage, setUsage] = useState<string>('indoor');
  const [fontFamily, setFontFamily] = useState<string>('Arial, sans-serif');

  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const basePrice = 50;
    let finalPrice = basePrice;

    // Adjust price based on size
    if (size === 'S') {
      finalPrice += 5;
    } else if (size === 'M') {
      finalPrice += 7;
    } else if (size === 'L') {
      finalPrice += 10;
    }

    // Adjust price based on support
    if (support === 'minimalist') {
      finalPrice += 15;
    }

    // Adjust price based on usage
    if (usage === 'outdoor') {
      finalPrice += 20;
    }

    // Adjust price based on tube color
    if (tubeColor != '#ff0000') {
      finalPrice += 10;
    }

    setPrice(finalPrice);
  }, [tubeColor, size, support, usage, setPrice, price]);

  return (
    <>
      <div className="container">
        <div className="preview">
          <NeonText
            id="0"
            text={text}
            color={color}
            fontSize={size === 'S' ? "3rem" : size === 'M' ? "4rem" : "5rem"}
            fontWeight={500}
            fontFamily={fontFamily}
            background={support === 'minimalist' ? 'transparent' : tubeColor === 'white' ? '#fff' : color}
            className='neon-text'
          />
        </div>
        <div className="editor">
          <a className="logo-link">À la recherche d’un logo ? Obtenez un devis</a>
          <Form.Root>
            <div className="text">
              <Form.Field name="alignment">
                <div className="flex">
                  <span className="input-header">1. Choisissez votre texte</span>
                  <div className="spacer" />
                  <Form.Control asChild>
                    <ToggleGroup.Root
                      className="ToggleGroup"
                      type="single"
                      defaultValue="left"
                      aria-label="Text alignment"
                      onValueChange={(value) => {
                        if (value) setTextAlignment(value);
                      }}
                      value={textAlignment}
                    >
                      <ToggleGroup.Item
                        className="ToggleGroupItem"
                        value="left"
                        aria-label="Left aligned"
                      >
                        <TextAlignLeftIcon />
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        className="ToggleGroupItem"
                        value="center"
                        aria-label="Center aligned"
                      >
                        <TextAlignCenterIcon />
                      </ToggleGroup.Item>
                      <ToggleGroup.Item
                        className="ToggleGroupItem last-child"
                        value="right"
                        aria-label="Right aligned"
                      >
                        <TextAlignRightIcon />
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </Form.Control>

                </div>
              </Form.Field>
              <Form.Field name="text">
                <Form.Label className="input-label">
                  Cliquez ci-dessous pour modifier le texte de votre néon LED.
                </Form.Label>
                <Form.Control asChild>
                  <textarea onChange={(e) => setText(e.currentTarget.value)} />
                </Form.Control>
                <Form.Label className="input-label">
                  Appuyez sur Entrée pour aller à la ligne.
                </Form.Label>
              </Form.Field>

              {/* Font */}
              <span className="input-header">Choix de la police</span>
              <Form.Field name="font">
                <Form.Control asChild>
                  <Select.Root onValueChange={setFontFamily} defaultValue="Arial, sans-serif">
                    <Select.Trigger className="SelectTrigger" aria-label="Font">
                      <Select.Value placeholder="Sélectionnez une police" />
                      <Select.Icon className="SelectIcon">
                        <ArrowDownIcon />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="SelectContent">
                        <Select.ScrollUpButton className="SelectScrollButton">
                          <ChevronUpIcon />
                        </Select.ScrollUpButton>
                        <Select.Viewport className="SelectViewport">
                          <Select.Group>
                            <Select.Label className="SelectLabel">Polices</Select.Label>
                            {fonts.map((font) => (
                              <Select.Item
                                className="SelectItem"
                                value={font.value}
                                key={font.value}
                              >
                                <Select.ItemText style={{ fontFamily: font.value }}>{font.label}</Select.ItemText>
                                <Select.ItemIndicator className="SelectItemIndicator">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>
                        <Select.ScrollDownButton className="SelectScrollButton">
                          <ChevronDownIcon />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </Form.Control>
              </Form.Field>
            </div>

            <div className="color">
              <Form.Field name="color">
                <span className="input-header">2. Couleur</span>
                <Form.Label className="input-label">
                  De quelle couleur voulez-vous votre néon ?
                </Form.Label>
                <Form.Control asChild>
                  <ToggleGroup.Root
                    className="ColorToggleGroup ToggleGroup"
                    type="single"
                    defaultValue="rgb"
                    aria-label="Color"
                    onValueChange={(value) => {
                      if (value) setColor(value);
                    }}
                    value={color}
                  >
                    {colors.map((color, i) => (
                      <ToggleGroup.Item
                        key={color.name}
                        className={`ToggleGroupItem ColorToggleGroupItem ${i + 1 === colors.length ? 'last-child' : ''}`}
                        value={color.value}
                        aria-label={color.name}
                      >
                        <div className="color-swatch">
                          <div className="bubble" style={{ backgroundColor: color.value }} />
                          <span>{color.name}</span>
                        </div>
                      </ToggleGroup.Item>
                    ))}
                  </ToggleGroup.Root>
                </Form.Control>
              </Form.Field>

              <Form.Field name="tube-color">
                <span className="input-header">Couleur du tube</span>
                <Form.Label className="input-label">
                  Choisissez l’aspect de votre néon lorsqu’il est éteint.
                </Form.Label>
                <Form.Control asChild>
                  <ToggleGroup.Root
                    className="ToggleGroup"
                    type="single"
                    defaultValue="white"
                    aria-label="Tube color"
                    onValueChange={(value) => {
                      if (value) setTubeColor(value);

                    }}
                    value={tubeColor}
                  >
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="white"
                      aria-label="White tube"
                    >
                      Tube Blanc
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      className="ToggleGroupItem last-child"
                      value="colored"
                      aria-label="Color tube"
                    >
                      Tube Coloré Assorti
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </Form.Control>
              </Form.Field>
            </div>

            <div className="size">
              <span className="input-header">3. Taille</span>
              <Form.Field name="size">
                {/* Select from S, M, L */}
                {/* No label */}
                <Form.Control asChild>
                  <ToggleGroup.Root
                    className="ToggleGroup"
                    type="single"
                    defaultValue="M"
                    aria-label="Size"
                    onValueChange={(value) => {
                      if (value) setSize(value);
                    }}
                    value={size}
                  >
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="S"
                      aria-label="Small"
                    >
                      S
                      <br />
                      <span className="small">5x6cm</span>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="M"
                      aria-label="Medium"
                    >
                      M
                      <br />
                      <span className="small">6x8cm</span>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      className="ToggleGroupItem last-child"
                      value="L"
                      aria-label="Large"
                    >
                      L
                      <br />
                      <span className="small">10x12cm</span>
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </Form.Control>
              </Form.Field>

              <span className="input-header">Type de support</span>
              <Form.Field name="support">
                <Form.Label className="input-label">
                  Choisissez le type de support pour votre néon.
                </Form.Label>
                {/* Toggle group, {minimalist, around letters, rectangular, support a pieds} */}
                <Form.Control asChild>
                  <ToggleGroup.Root
                    className="ToggleGroup"
                    type="single"
                    defaultValue="minimalist"
                    aria-label="Support"
                    onValueChange={(value) => {
                      if (value) setSupport(value);
                    }}
                    value={support}
                  >
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="minimalist"
                      aria-label="Minimalist support"
                    >
                      Minimaliste
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="rectangular"
                      aria-label="Rectangular support"
                    >
                      Rectangulaire
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </Form.Control>
              </Form.Field>

              <span className="input-header">Usage</span>
              <Form.Field name="usage">
                <Form.Label className="input-label">
                  Où comptez-vous placer votre néon ?
                </Form.Label>
                <Form.Control asChild>
                  <ToggleGroup.Root
                    className="ToggleGroup"
                    type="single"
                    defaultValue="indoor"
                    aria-label="Usage"
                    onValueChange={(value) => {
                      if (value) setUsage(value);
                    }}
                    value={usage}
                  >
                    <ToggleGroup.Item
                      className="ToggleGroupItem"
                      value="indoor"
                      aria-label="Indoor usage"
                    >
                      Intérieur
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      className="ToggleGroupItem last-child"
                      value="outdoor"
                      aria-label="Outdoor usage"
                    >
                      Extérieur
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </Form.Control>
              </Form.Field>
            </div>
          </Form.Root>

          {/* Prix */}
          <div className="price">
            <span className="input-header">Prix</span>
            <div className="price-container">
              <span className="price-value">{price} EUR</span>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}