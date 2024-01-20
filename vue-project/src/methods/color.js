export function setDynamicColor(color){
  let hex;
  if (typeof color === 'string' && color[0] === '#'){
    hex = color
  }else{
    hex = Rgb2Hex(color)
  }
  // console.log(color)
  // console.log(hex)
  const colorObj = hex2Hsl(hex)
  const reverseColorObj = getReverseColor(colorObj)
  const [colorHex, reverseColorHex] = [
      hsl2Hex(colorObj.h, colorObj.s, colorObj.l),
      hsl2Hex(reverseColorObj.h, reverseColorObj.s, reverseColorObj.l)
  ]
  document.documentElement.style.setProperty('--luc-dynamic-bg-color', colorHex);
  document.documentElement.style.setProperty('--luc-dynamic-text-color', reverseColorHex);
}

export function setLightTheme(){
  document.documentElement.style.setProperty('--luc-dynamic-bg-color', '#EBEBEB');
  document.documentElement.style.setProperty('--luc-dynamic-text-color', '#252525');
}

export function setDarkTheme(){
  document.documentElement.style.setProperty('--luc-dynamic-bg-color', '#252525');
  document.documentElement.style.setProperty('--luc-dynamic-text-color', '#EBEBEB');
}

export function getRandomColor(){
  const colors = [
    '#A62900',
    '#3B6796',
    '#C3D9E2',
    '#DCACCC',
    '#9E918A',
    '#6D814B',
    '#B88F7A',
    '#848A90',
    '#E5DFCC',
    '#ABBD98'
  ]
  const idx = Math.floor(Math.random()*colors.length)
  return colors[idx]
}

export function getReverseColor(hslObj){
    if (25 < hslObj.l && hslObj.l < 75) {
      return {
        'h': 360,
        's': 0,
        'l': 100,
      }
    } else {
      return {
        'h': hslObj.h,
        's': hslObj.s,
        'l': 100 - hslObj.l,
      }
    }
}

export function Rgb2Hex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

export function hex2Hsl(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    // return "hsl(" + h + "," + s + "%," + l + "%)";
    return {
        'h': h,
        's': s,
        'l': l
    }
  }

export function hsl2Hex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    let result = `#${f(0)}${f(8)}${f(4)}`
    return result.toUpperCase();
  }