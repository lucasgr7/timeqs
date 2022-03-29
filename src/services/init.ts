export default (timeName: string, db: any) => {
  if (db.hasOwnProperty(timeName)) { return db }

  if(timeName !== 'voleifranca') return db;

  const database = {} as any
  database[timeName] = {
    jogadores: [
      {
        nome: 'Carol',
        foto: '',
      },
      {
        nome: 'Douglas',
        foto: 'https://i.ibb.co/RGFJgGb/pp.jpg',
      },
      {
        nome: 'Renato',
        foto: 'https://i.ibb.co/GcTjGYF/128426470-2095586377238206-8286169600993157730-n.jpg',
      },
      {
        nome: 'Rodrigo',
        foto: 'https://i.ibb.co/87ZHWvd/268590123-497111551737845-1094640677242613296-n.jpg',
      },
      {
        nome: 'Rafa',
        foto: 'https://i.ibb.co/dGFXkvK/pp.jpg',
      },
      {
        nome: 'Erik',
        foto: 'https://i.ibb.co/QFd4WCD/250377576-951088452278290-8549506192254237048-n.jpg',
      },
      {
        nome: 'Mariana',
        foto: '',
      },
      {
        nome: 'Rômulo',
        foto: 'https://i.ibb.co/MfGLxsH/187192150-314114900388090-3478793610410617905-n.jpg',
      },
      {
        nome: 'Ana Claudia',
        foto: 'https://i.ibb.co/BgMt0WT/265879963-711476120268578-6861821516878499956-n.jpg',
      },
      {
        nome: 'Sara',
        foto: 'https://i.ibb.co/Zg52y3Q/208293672-1337833966719561-7950503491724063921-n.jpg',
      },
      {
        nome: 'João Paulo',
        foto: '',
      },
      {
        nome: 'Naiara Silveira',
        foto: '',
      },
      {
        nome: 'Guilherme W.',
        foto: '',
      },
      {
        nome: 'Daniel Barbosa',
        foto: 'https://i.ibb.co/3fG0m2w/74763399-2653676478092098-2963689141224170185-n.jpg',
      },
      {
        nome: 'Leandro Maia',
        foto: 'https://i.ibb.co/4TvqPGQ/251801673-991064298176966-7350575651861633930-n.jpg',
      },
      {
        nome: 'Lucas Ribeiro',
        foto: 'https://i.ibb.co/3vgCNsV/161278141-140516661740076-107885017285901098-n.jpg',
      },
      {
        nome: 'Leandro Maia',
        foto: 'https://i.ibb.co/4TvqPGQ/251801673-991064298176966-7350575651861633930-n.jpg',
      },
      {
        nome: 'Caio (vida) Melo',
        foto: '',
      },
      {
        nome: 'Bruno Andrade',
        foto: 'https://i.ibb.co/86xB8jf/258649124-624301268641593-6346349739665364069-n.jpg',
      },
      {
        nome: 'Maria Gabriela 🌻',
        foto: '',
      },
      {
        nome: 'Eduardo Barbosa',
        foto: '',
      },
      {
        nome: 'Leonardo',
        foto: '',
      },
      {
        nome: 'Gustavo Barbosa',
        foto: '',
      },
    ]//TODO: Add Jogadores do Franca Volei
  }
  return database
}
