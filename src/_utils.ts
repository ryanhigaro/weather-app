export function capitalize(content: string) {
    const texts = content.split(" ");
    return texts
      .map((text) => {
        return text[0].toUpperCase() + text.substring(1);
      })
      .join(" ");
  }
