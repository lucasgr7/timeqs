import type { DATABASE, SCORE } from '@/interfaces/database'
import { describe, it, expect } from 'vitest'

import { syncDatabase } from '../syncronizer'

//TEST PROPERTIES
const HASH = '123'

describe('Saves Scores', () => {
  it('Stores the object into a database without scores in jogadores', () => {
    const USER_SAVED = 'userSaved'
    const REMOTE_DB = {
      timeName: 'test',
      jogadores: [
        {
          foto: 'mypic',
          nome: USER_SAVED,
        }
      ]
    } as DATABASE
    const LOCAL_DB = {
      timeName: 'test',
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
    } as DATABASE
    const result = syncDatabase(REMOTE_DB, LOCAL_DB, HASH)
    expect(result.jogadores).toEqual(LOCAL_DB.jogadores)
  }),
    it('Stores the object into a database with scores already', () => {

      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        timeName: 'test',
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
            ] as SCORE[]
          }
        ]
      } as DATABASE
      const LOCAL_DB = {
        timeName: 'test',
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
      } as DATABASE
      const result = syncDatabase(REMOTE_DB, LOCAL_DB, HASH).jogadores[0]
      expect(result.scores.length).toBe(2)
    }),
    it('Updates the score from an already existing HASH', () => {
      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        timeName: 'test',
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
            ] as SCORE[]
          }
        ]
      } as DATABASE
      const LOCAL_DB = {
        timeName: 'test',
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
      } as DATABASE
      const result = syncDatabase(REMOTE_DB, LOCAL_DB, HASH).jogadores[0]
      expect(result.scores.length).toBe(1)
      expect(result.scores[0].score).toBe(1)
    }),
    it('Stores the score from a single player and do not change other players',() => {
      
      const USER_SAVED = 'userSaved'
      const REMOTE_DB = {
        timeName: 'test',
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
            ] as SCORE[]
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
            ] as SCORE[]
          },
        ]
      } as DATABASE
      const LOCAL_DB = {
        timeName: 'test',
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
      } as DATABASE
      const jogadores = syncDatabase(REMOTE_DB, LOCAL_DB, HASH).jogadores
      expect(jogadores[0].scores.length).toBe(2)
      const mapScores = jogadores[0].scores.map((x: SCORE) => x.score)
      expect(mapScores).toContain(1)
      expect(mapScores).toContain(6)

      expect(jogadores[1]).toEqual(REMOTE_DB.jogadores[1])
    })
    it('Stores continously new scores for each player entry', () => {
      //TODO: Create me
    })
})