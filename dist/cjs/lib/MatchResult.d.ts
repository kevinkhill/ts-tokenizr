export declare class MatchResult {
    matched: boolean;
    input?: string;
    index?: number;
    result: string[];
    length: number;
    map: string[]["map"];
    find: string[]["find"];
    filter: string[]["filter"];
    includes: string[]["includes"];
    constructor(execArray: RegExpExecArray | null);
}
