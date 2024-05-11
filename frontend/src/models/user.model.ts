export interface FeProfileI {
    fws: string[];
    htmlLvl: number;
    jsLvl: number;
    cssLvl: number;
    tools: string[];
    tsLvl: number;
}

export interface BeProfileI {
    fws: string[];
    plangs: string[];
    dockerLvl: number;
    kuberLvl: number;
    awsAzureGcpLvl: number;
    sqlLvl: number;
  }
  

export interface SSProfileI {
    commStyle: string;
    conflictHandlingMethod: string;
    listeningLvl: number;
    verbalLvl: number;
    writtenLvl: number;
    collabLvl: number;
    conflictResolutionLvl: number;
    leadershipLvl: number;
  }
  

export interface Profile {
    xp?: number;
    indType?: string[];
    feProfile?: FeProfileI;
    beProfile?: BeProfileI;
    ssProfile?: SSProfileI;
    feProfileId?: number;
    beProfileId?: number;
    ssProfileId?: number;
}

export const ROLE_MAPPING = new Map<number, string>([
    [1, 'newbie'],
    [2, 'buddy'],
    [3, 'manager'],
]);

export default interface User {
    name: string;
    paused: boolean;
    profile?: Profile;
    rolePriority: number;
}