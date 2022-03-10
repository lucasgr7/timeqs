export default (timeName: string, db: any) => {
  if (db.hasOwnProperty(timeName)) { return db }

  if(timeName !== 'voleifranca') return db;

  const database = {} as any
  database[timeName] = {
    jogadores: [
      {
        nome: 'Alex',
        foto: 'https://i.ibb.co/wNYPPx3/pp.jpg',
        edittableDate: null
      },
      {
        nome: 'Douglas',
        foto: 'https://i.ibb.co/RGFJgGb/pp.jpg',
        edittableDate: null
      },
      {
        nome: 'Rafa',
        foto: 'https://i.ibb.co/dGFXkvK/pp.jpg',
        edittableDate: null
      },
    ]
  }
  return database
}
