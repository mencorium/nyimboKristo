/** This is the file for mapping names of songs together with picture names */

type ImageMapping = {
    songName: string;
    picName: string;
    path: any; // The `require` function returns an object, so we use `any` here.
    number: number;
  };
  
  // The function that returns the mapped images
  const mapSongsToImages = (): ImageMapping[] => {
    const songNames: string[] = [
        'Mtakatifu', 
        "Twamsifu Mungu", 
        "Mungu atukuzwe",
        "Jina la Yesu salamu",
        "Na tumwabudu Mfalme",
        "Kumekucha kwa Uzuri",
        "Mungu Msaada wetu",
        "Uje MKombozi",
        "Mwumabji, Mfalme",
        "Kristo wa neema",
        "Jina la Bwana li heri",
        "Msifu Mungu wa Neema",
        "Yesu uje kwetu",
        "Nitembee nawe",
        "Nena rohoni Yesu",
        "Bwana ninakuhitaji",
        "Si mimi kristo",
        "Mwokozi kama Mchunga",
        "Msalabani pa Mwokozi",
        "Mungu wetu yeye mwamba",
        "Baba twakujia",
        "Usinipite Mwokozi",
        "Yesu Furaha ya moyo",
        "Jina lake Yesu tamu",
        "Taji mvikeni",
        "Tutokapo tubriki",
        "Tena Mwokozi twalitukuza",
        "Jina la Thamani",
        "Yesu nakupenda U mali",
        "Yesu unipendaye",
        "Niimbe pendo lake",
        "Tangu kuamini",
        "Karibu sana",
        "Nipe Habari za Yesu",
        "Nimekombolewa na Yesu",
        "Siku kuu",
        "Pendo lako ee Mwkozi",
        "Nasifu shani ya Mungu",
        "Ati, kuna mvua njema",
        "Nijaze sasa",
        "Roho Mtakatifu",
        "Ewe roho wa mbinguni",
        "Furaha gani",
        "Hakuna rafiki kama Yesu",
        "Mlimani pana mwanga (Mwanga umo Moyoni)",
        "Miguuni pake Yesu",
        "Ni heri Kifungo",
        "Ninakupenda zaidi",
        "Ninaye rafiki",
        "Mungu awe nanyi daima",
        "Kuwa Na Yesu",
        "Nipe Biblia",
        "Napenda kuhubiri",
    ];
    
    // Use static require for images
    const images = [
      require('@/assets/songImages/1.jpg'),
      require('@/assets/songImages/2.jpg'),
      require('@/assets/songImages/3.jpg'),
      require('@/assets/songImages/4.jpg'),
      require('@/assets/songImages/5.jpg'),
      require('@/assets/songImages/6.jpg'),
      require('@/assets/songImages/7.jpg'),
      require('@/assets/songImages/8.jpg'),
      require('@/assets/songImages/9.jpg'),
      require('@/assets/songImages/10.jpg'),
      require('@/assets/songImages/11.jpg'),
      require('@/assets/songImages/12.jpg'),
      require('@/assets/songImages/13.jpg'),
      require('@/assets/songImages/14.jpg'),
      require('@/assets/songImages/15.jpg'),
      require('@/assets/songImages/16.jpg'),
      require('@/assets/songImages/17.jpg'),
      require('@/assets/songImages/18.jpg'),
      require('@/assets/songImages/19.jpg'),
      require('@/assets/songImages/20.jpg'),
      require('@/assets/songImages/21.jpg'),
      require('@/assets/songImages/22.jpg'),
      require('@/assets/songImages/23.jpg'),
      require('@/assets/songImages/24.jpg'),
      require('@/assets/songImages/25.jpg'),
      require('@/assets/songImages/26.jpg'),
      require('@/assets/songImages/27.jpg'),
      require('@/assets/songImages/28.jpg'),
      require('@/assets/songImages/29.jpg'),
      require('@/assets/songImages/30.jpg'),
      require('@/assets/songImages/31.jpg'),
      require('@/assets/songImages/32.jpg'),
      require('@/assets/songImages/33.jpg'),
      require('@/assets/songImages/34.jpg'),
      require('@/assets/songImages/35.jpg'),
      require('@/assets/songImages/36.jpg'),
      require('@/assets/songImages/37.jpg'),
      require('@/assets/songImages/38.jpg'),
      require('@/assets/songImages/39.jpg'),
      require('@/assets/songImages/40.jpg'),
      require('@/assets/songImages/41.jpg'),
      require('@/assets/songImages/42.jpg'),
      require('@/assets/songImages/43.jpg'),
      require('@/assets/songImages/44.jpg'),
      require('@/assets/songImages/45.jpg'),
      require('@/assets/songImages/46.jpg'),
      require('@/assets/songImages/47.jpg'),
      require('@/assets/songImages/48.jpg'),
      require('@/assets/songImages/49.jpg'),
      require('@/assets/songImages/50.jpg'),
      require('@/assets/songImages/51.jpg'),
      require('@/assets/songImages/52.jpg'),
      require('@/assets/songImages/53.jpg'),
      /*require('@/assets/songImages/4.jpg'),
      require('@/assets/songImages/5.jpg'),
      require('@/assets/songImages/6.jpg'),
      require('@/assets/songImages/7.jpg'),
      require('@/assets/songImages/8.jpg'),
      require('@/assets/songImages/9.jpg'),
      require('@/assets/songImages/10.jpg'),*/


    ];
  
    // Return the mapped result
    return songNames.map((songName, index) => ({
      songName,
      picName: `${songName.replace(/\s+/g, '_').toLowerCase()}`, // Make a nice picName
      path: images[index], // The require result
      number: index + 1,
    }));
  };
  
  export default mapSongsToImages;
  