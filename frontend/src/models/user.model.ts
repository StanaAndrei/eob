import moment from 'moment';

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
    id: number;
    buddyId?: number;
    name: string;
    paused: boolean;
    profile?: Profile;
    rolePriority: number;
    email: string;
    createdAt: string;
    matchDate?: string;
}

export function isRecent(user: User): boolean {
    const diffInDays = moment().diff(user.matchDate, 'days');
    return diffInDays <= 1;
}

export const DEFAULT_PROFILE: Profile = {
    xp: 0,
    indType: [''],
    feProfile: {
        fws: [''],
        tools: [''],
        htmlLvl: 0,
        cssLvl: 0,
        tsLvl: 0,
        jsLvl: 0,
    },
    beProfile: {
        plangs: [''],
        fws: [''],
        dockerLvl: 0,
        kuberLvl: 0,
        awsAzureGcpLvl: 0,
        sqlLvl: 0,
    },
    ssProfile: {
        commStyle: '',
        conflictHandlingMethod: '',
        listeningLvl: 0,
        verbalLvl: 0,
        writtenLvl: 0,
        collabLvl: 0,
        conflictResolutionLvl: 0,
        leadershipLvl: 0
    }//*/
};