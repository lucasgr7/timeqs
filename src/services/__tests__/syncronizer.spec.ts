import { describe, it, expect } from 'vitest'

import { syncDatabase } from '../syncronizer'

//TEST PROPERTIES
const HASH = '123'
const TIME_NAME = 'myTeam'

describe('Saves Scores', () => {
  it('Stores the object into a database without scores in jogadores', () => {
    const USER_SAVED = 'userSaved'
    const REMOTE_DB = {
      'myTeam': {
        jogadores: [
          {
            foto: 'mypic',
            nome: USER_SAVED,
          }
        ]
      }
    }
    const LOCAL_DB = {
        'myTeam': {
        jogadores: [
          {
            foto: 'mypic',
            nome: USER_SAVED,
            scores: [
              {
                changeAt: new Date().toJSON(),
                hash: HASH,
                score: 1
              }
            ] as any[]
          }
        ]
      }
    } as any
    const result = syncDatabase(REMOTE_DB, LOCAL_DB, HASH, TIME_NAME)
    console.log(result)
    console.log(result.myTeam)
    console.log(result["myTeam"])
    expect(result[TIME_NAME].jogadores).toEqual(LOCAL_DB[TIME_NAME].jogadores)
  }),
    it('Stores the object into a database with scores already', () => {

      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: '465',
                  score: 8
                }
              ]  as any[]
            }
          ]
        }
      } as any
      const LOCAL_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ]  as any[]
            }
          ]
        }
      } as any
      const result = syncDatabase(REMOTE_DB, LOCAL_DB, HASH, TIME_NAME)['myTeam'].jogadores[0]
      expect(result.scores.length).toBe(2)
    }),
    it('Updates the score from an already existing HASH', () => {
      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 8
                }
              ]  as any[]
            }
          ]
        }
      } as any
      const LOCAL_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ] as any[]
            }
          ]
        }
      } as any
      const data = syncDatabase(REMOTE_DB, LOCAL_DB, HASH, TIME_NAME)['myTeam']
      console.log(data['myTeam'])
      const result = data.jogadores[0]
      expect(result.scores.length).toBe(1)
      expect(result.scores[0].score).toBe(1)
    }),
    it('Stores the score from a single player and do not change other players',() => {
      
      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 8
                },
                {
                  changeAt: new Date().toJSON(),
                  hash: 'second hash',
                  score: 6
                }
              ] as any[]
            },
            {
              foto: 'mypic',
              nome: 'second player',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: 'second hash',
                  score: 5
                }
              ] as any[]
            },
          ]
        }
      } as any
      const LOCAL_DB = {
          'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: USER_SAVED,
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ] as SCORE[]
            }
          ]
        }
      } as any
      const data = syncDatabase(REMOTE_DB, LOCAL_DB, HASH, TIME_NAME)
      console.log(data)
      const jogadores = data['myTeam'].jogadores
      expect(jogadores[0].scores.length).toBe(2)
      const mapScores = jogadores[0].scores.map((x: SCORE) => x.score)
      expect(mapScores).toContain(1)
      expect(mapScores).toContain(6)

      expect(jogadores[1]).toEqual(REMOTE_DB[TIME_NAME].jogadores[1])
    })
    it('Stores continously new scores for each player entry', () => {
      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: '1',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: 'second hash',
                  score: 6
                }
              ] as any[]
            },
            {
              foto: 'mypic',
              nome: '2',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: 'second hash',
                  score: 5
                }
              ] as any[]
            },
            {
              foto: 'mypic',
              nome: '3',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: 'second hash',
                  score: 9
                }
              ] as any[]
            },
          ]
        }
      } as any
      const LOCAL_DB = {
        'myTeam': {
          jogadores: [
            {
              foto: 'mypic',
              nome: '1',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ]  as any[]
            },
            {
              foto: 'mypic',
              nome: '2',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ] as SCORE[]
            },
            {
              foto: 'mypic',
              nome: '3',
              scores: [
                {
                  changeAt: new Date().toJSON(),
                  hash: HASH,
                  score: 1
                }
              ] as any[]
            }
          ]
        }
      } as any

      const data = syncDatabase(REMOTE_DB, LOCAL_DB, HASH, TIME_NAME)
      console.log(data ?? `nule value`)
      const jogadores = data['myTeam']['jogadores']
      expect(jogadores[0].scores.length).toBe(2)
      expect(jogadores[1].scores.length).toBe(2)
      expect(jogadores[2].scores.length).toBe(2)

      console.log(jogadores)
      expect(jogadores[1]).toEqual(REMOTE_DB[TIME_NAME].jogadores[1])

    })
})