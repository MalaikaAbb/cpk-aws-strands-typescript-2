// Not in the docs ("Your renderers stay as they are"): minimal Airport and Arrow
// components so the catalog has something to render. Props follow the docs' schema
// ("An airport by IATA code, with its city under it." / "An arrow between two airports.").
export function Airport({ code, city }: { code: string; city: string }) {
  return (
    <div>
      <div>{code}</div>
      <div>{city}</div>
    </div>
  );
}

export function Arrow() {
  return <span>→</span>;
}
