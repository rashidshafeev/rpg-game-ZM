class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
      spriteW: 30,
      spriteH: 30
    })
  }

  init() {
    this.levelCfg.map.forEach((mapRow, y) => {
      mapRow.forEach((mapCell, x) => {
        console.log(mapCell[0]);
        this.engine.renderSpriteFrame({
          sprite: ['terrain', mapCell[0]],
          frame: 0,
          x: x * this.spriteW,
          y: y * this.spriteH,
          w: this.spriteW,
          h: this.spriteH
        })
      })
    })

    
  }
}

export default ClientWorld;