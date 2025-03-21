type pipeSounds = {
    keyname: string;
    path: any;
    keyId: number;
};

const keyNames = [
    'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
];

const keySounds = [
    require('@/assets/pianonotes/C.mp3'),
    require('@/assets/pianonotes/Db.mp3'),
    require('@/assets/pianonotes/D.mp3'),
    require('@/assets/pianonotes/Eb.mp3'),
    require('@/assets/pianonotes/E.mp3'),
    require('@/assets/pianonotes/F.mp3'),
    require('@/assets/pianonotes/Gb.mp3'),
    require('@/assets/pianonotes/G.mp3'),
    require('@/assets/pianonotes/Ab.mp3'),
    require('@/assets/pianonotes/A.mp3'),
    require('@/assets/pianonotes/Bb.mp3'),
    require('@/assets/pianonotes/B.mp3'),
];

/****************************************************
 * This Function return the dictionary with below structure
 * 
 * type pipeSounds = {
 *  keyname: string;
 *  path: any;
 * keyId: number;
 *};
 * 
 * the structure is used as primary source of keynote 
 * sound used in getPipeSounds function
****************************************************/
const pipeSoundDictionary = (): pipeSounds[] => {
    return keyNames.map((keyname, index) => ({
        keyname,
        path: keySounds[index],
        keyId: index,
    }));
};



/**********************************************************************
 * This function return the correct path of particular keynote sound.
 * It accept two parameter key and flat, these are name of the key note 
 * and state to show if keynote has flat symbol or not 
 * *********************************************************************/
const getPipeSounds = (key: string, flat: boolean) => {
    const pitchpipe = pipeSoundDictionary();
    const correctName = flat ? `${key}b` : key; // Fix incorrect append usage

    const correctPitch = pitchpipe.find((item) => item.keyname === correctName);

    return correctPitch ? correctPitch.path : null; // Handle missing sound gracefully
};

export default getPipeSounds;