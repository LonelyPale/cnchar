declare type spellArg = 'array' | 'low' | 'up' | 'first' | 'poly' | 'tone' | 'simple';
declare type strokeArg = 'letter' | 'shape' | 'count' | 'name' | 'detail' | 'array' | 'order' | 'simple';
declare type orderToWordArg = 'all' | 'simple';
declare type pluginArg = 'order' | 'trad' | 'poly';
declare type orderName = '横折折撇' | '竖弯' | '横折' | '撇点' | '横斜钩' | '横' | '捺' | '横折钩' | '竖' | '竖钩' | '点' | '撇' | '撇折' | '竖折撇' | '横折折折钩' | '竖折折钩' | '提' | '弯钩' | '斜钩' | '横折折' | '横撇' | '横折提' | '横折折折' | '竖提' | '竖弯钩';

declare interface CnCharStatic {
    spell(sentence: string, ...args: Array<spellArg>): string | Array<any>;
    stroke(sentence: string, ...args: Array<strokeArg>): number | Array<any>;
    use(...plugins: Array<Function>): void;
    orderToWord: {
        (orders: Array<orderName>, ...args: Array<orderToWordArg>): Array<string>;
        orders: object;
    };
    convert: {
        simpleToSpark(sentence: string): string;
        simpleToTrad(sentence: string): string;
        sparkToSimple(sentence: string): string;
        sparkToTrad(sentence: string): string;
        tradToSimple(sentence: string): string;
        tradToSpark(sentence: string): string;
    };
    readonly version: string;
    plugins: Array<pluginArg>;
    type: {
        spell: object;
        stroke: object;
        orderToWord: object;
    };
    check: boolean;
}

declare const cnchar: CnCharStatic;

export default cnchar;