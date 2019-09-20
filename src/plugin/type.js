export default {
    tradtional:"tradtional",
    order:'order',
    polyphone:'polyphone',
    tone:'tone'
}
/*

1.拼音 spell-dict-jian 
.spell() 
基本版本

2.笔画 stroke-count-jian 
.stroke()
独立

多音 ： polyphone-phrase-simple
.spellPoly();
依赖 1

笔画顺序 ： 引入笔画顺序库 stroke-order-jian
.strokeOrder()
独立

繁体 ： 支持繁体简体火星文互转 繁体笔画 jian-fan.js
    拼音公用简体
    笔画数：引入 stroke-count-fan
    如引入 笔画顺序 则需引入 stroke-order-fan
依赖1或2

.convert()
.spellTrad()
.spellSpark()

笔画位置：// 暂不考虑
*/