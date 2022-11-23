export default function Page({ params }: { params: { id: number } }) {
  const id = params.id;

  return (
    <div>
      <section>Room {id}</section>
    </div>
  );
}
