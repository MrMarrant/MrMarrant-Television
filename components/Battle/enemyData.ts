export interface ActOption {
    label: string;
    response: string[];
}

export interface BattleEnemy {
    name: string;
    image: string;
    maxHp: number;
    atk: number;
    introText: string[];
    actOptions: ActOption[];
    defeatText: string[];
    spareText: string[];
}

export const ENEMY: BattleEnemy = {
    name: 'MrMarrant',
    image: '/images/enemy.png',
    maxHp: 50,
    atk: 4,
    introText: [
        '* MRMARRANT blocks your path!',
        '* It does look happy.',
    ],
    actOptions: [
        {
            label: 'Check',
            response: [
                '* MRMARRANT - ATK 4 DEF 2',
                '* HE LAUGHS, WITHOUT EVEN EXISTING, HE HEARS EVERYTHING, HE THINKS OF YOU, HE THINKS OF WHAT YOU\'RE DOING!',
            ],
        },
        {
            label: 'Laugh',
            response: [
                '* You try to laugh, it sound awkward.',
                '* It is staring at you.',
            ],
        },
        {
            label: 'Turn off',
            response: [
                '* You try to turn off the TV.',
                '* Nothing happens. Somehow it still works.',
            ],
        },
        {
            label: 'Seduce',
            response: [
                '* You take your clothes off',
                '* It displays a help screen for people in distress',
            ],
        },
        {
            label: 'Apologize',
            response: [
                '* You apologize for mankind.',
                '* He thinks about it for 1,102 milliseconds and doesn\'t know what to do with this information.',
            ],
        },
    ],
    defeatText: [
        '* MRMARRANT bursts out laughing.',
        '* He smile.',
    ],
    spareText: [
        '* MRMARRANT doesn\'t seem happy.',
        '* LEAVE, LEAVE, LEAVE THIS PLACE.',
    ],
};

export const PLAYER_MAX_HP = 20;
export const PLAYER_ATK = 5;
export const PLAYER_LV = 1;
