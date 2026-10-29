import React, { useState, useEffect, useRef } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Upload,
  Trash2,
  LogIn,
  LogOut,
  Music,
  Search,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  UserPlus,
  Smartphone,
  Rocket,
  Globe,
  Home,
  Library,
  Plus,
  Heart,
  MoreVertical,
  Cast,
  Headphones,
  Bell,
  Clock,
  Battery,
  ArrowLeft,
  Shuffle,
  Download,
  Folder,
  Image as ImageIcon,
  Share2,
  FolderPlus,
  ListMusic,
  Sparkles,
  RefreshCw,
  MinusCircle,
  FolderCheck
} from 'lucide-react';

// ==========================================
// 1. CONFIGURACIÓN Y CLIENTE SUPABASE
// ==========================================
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://djqjagjaywphhaoonbdq.supabase.co';
export const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'sb_publishable_ksSF0e-Rml3_zgrbccACag_TVw6nhKw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export interface Song {
  id: string | number;
  titulo: string;
  artista: string;
  url: string;
  storage_path: string;
  created_at?: string | null;
  cover?: string;
  // Campos oficiales de la tabla 'songs' de Supabase
  title?: string;
  artist?: string;
  cover_url?: string;
  audio_url?: string;
  folder_id?: string;
}

export interface AudioFolder {
  id: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  coverKey: string;
  badge?: string;
  canciones: Song[];
}

export const carpetasAudio: AudioFolder[] = [
  {
    id: 'buchonass',
    titulo: 'buchonass',
    subtitulo: 'El Fantasma, Los Dos Carnales, Calibre 50, Peso Pluma',
    descripcion: 'Carpeta oficial de corridos, música bélica y regional mexicano de FINANCIERA AARON.',
    coverKey: 'cover_buchonass',
    badge: 'Corridos & Regional',
    canciones: [
      {
        id: 'buch_1',
        titulo: 'El Tóxico',
        artista: 'Grupo Firme & Carin Leon',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_2',
        titulo: 'El Envidioso',
        artista: 'Los Dos Carnales',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_3',
        titulo: 'Cabrón y Vago',
        artista: 'El Fantasma & Los Dos Carnales',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_4',
        titulo: 'Siempre Pendientes',
        artista: 'Peso Pluma & Luis R Conriquez',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_5',
        titulo: 'JGL',
        artista: 'La Adictiva & Luis R Conriquez',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_6',
        titulo: 'Ch y la Pizza',
        artista: 'Fuerza Regida & Natanael Cano',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      },
      {
        id: 'buch_7',
        titulo: 'PRC',
        artista: 'Peso Pluma & Natanael Cano',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_buchonass'
      }
    ]
  },
  {
    id: 'tus_me_gusta',
    titulo: 'Tus me gusta',
    subtitulo: 'Tus temas favoritos y canciones subidas a Supabase',
    descripcion: 'Carpeta personal y sincronizada en la nube. Todas las canciones que subas aparecerán aquí.',
    coverKey: 'cover_tus_me_gusta',
    badge: 'Favoritos & En la Nube',
    canciones: [
      {
        id: 'fav_1',
        titulo: '23 (Remix)',
        artista: 'Mike WiLL Made-It, Miley Cyrus, Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_23'
      },
      {
        id: 'fav_2',
        titulo: 'Safaera',
        artista: 'Bad Bunny, Jowell & Randy',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'fav_3',
        titulo: 'La Incondicional',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'fav_4',
        titulo: 'No Se Va',
        artista: 'Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_lob'
      }
    ]
  },
  {
    id: 'perreale',
    titulo: 'Perreale',
    subtitulo: 'Bad Bunny, Feid, Karol G, Miley Cyrus, Wiz Khalifa',
    descripcion: 'Carpeta de reggaetón, perreo intenso y ritmos urbanos latinos.',
    coverKey: 'cover_perreale',
    badge: 'Reggaetón & Perreo',
    canciones: [
      {
        id: 'perr_1',
        titulo: '23',
        artista: 'de-It, Miley Cyrus, Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_23'
      },
      {
        id: 'perr_2',
        titulo: 'Monaco',
        artista: 'Bad Bunny',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_3',
        titulo: 'Classy 101',
        artista: 'Feid & Young Miko',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_4',
        titulo: 'LALA',
        artista: 'Myke Towers',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_5',
        titulo: 'TQG',
        artista: 'Karol G & Shakira',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      },
      {
        id: 'perr_6',
        titulo: 'Yandel 150',
        artista: 'Yandel & Feid',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        storage_path: '',
        cover: 'cover_perreale'
      }
    ]
  },
  {
    id: 'lob_songs',
    titulo: 'LOB SONGS',
    subtitulo: 'Nueva Marca, Marca Registrada, Grupo Firme, Grupo Frontera',
    descripcion: 'Lo más nuevo de banda, campirano y sierreño en alta fidelidad.',
    coverKey: 'cover_lob',
    badge: 'Banda & Grupero',
    canciones: [
      {
        id: 'lob_1',
        titulo: 'No Se Va',
        artista: 'Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_2',
        titulo: 'Ya Supérame',
        artista: 'Grupo Firme',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_3',
        titulo: 'Di Que Sí',
        artista: 'Grupo Marca Registrada & Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_4',
        titulo: 'El Rescate',
        artista: 'Grupo Marca Registrada & Junior H',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_lob'
      },
      {
        id: 'lob_5',
        titulo: 'Bebé Dame',
        artista: 'Fuerza Regida & Grupo Frontera',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_lob'
      }
    ]
  },
  {
    id: 'los_2000',
    titulo: "los 2000'",
    subtitulo: 'High School Musical, Camp Rock, Jonas Brothers, Avril Lavigne',
    descripcion: 'Nostalgia pura de la década dorada de los 2000s Pop & Soundtracks.',
    coverKey: 'cover_2000',
    badge: 'Nostalgia Pop 2000s',
    canciones: [
      {
        id: '2000_1',
        titulo: 'Breaking Free',
        artista: 'High School Musical Cast',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_2',
        titulo: 'This Is Me',
        artista: 'Camp Rock & Demi Lovato',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_3',
        titulo: 'Year 3000',
        artista: 'Jonas Brothers',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_4',
        titulo: 'Complicated',
        artista: 'Avril Lavigne',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_2000'
      },
      {
        id: '2000_5',
        titulo: 'Toxic',
        artista: 'Britney Spears',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_2000'
      }
    ]
  },
  {
    id: 'grwm',
    titulo: 'GRWM🍒💋⭐💍',
    subtitulo: 'Rihanna, Wiz Khalifa, Ariana Grande, Dua Lipa',
    descripcion: 'Get Ready With Me: Pop, Hip-Hop y R&B glamoroso para motivarte.',
    coverKey: 'cover_grwm',
    badge: 'Pop & Glam',
    canciones: [
      {
        id: 'grwm_1',
        titulo: 'Diamonds',
        artista: 'Rihanna',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_2',
        titulo: '7 rings',
        artista: 'Ariana Grande',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_3',
        titulo: 'Swalla',
        artista: 'Jason Derulo, Nicki Minaj & Ty Dolla $ign',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_4',
        titulo: 'Young, Wild & Free',
        artista: 'Snoop Dogg & Wiz Khalifa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      },
      {
        id: 'grwm_5',
        titulo: 'Levitating',
        artista: 'Dua Lipa',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_grwm'
      }
    ]
  },
  {
    id: 'baladas',
    titulo: 'Baladas Románticas',
    subtitulo: 'Luis Miguel, Cristian Castro, Chayanne, Alejandro Fernández',
    descripcion: 'Las joyas románticas más apasionadas que marcaron generaciones.',
    coverKey: 'cover_baladas',
    badge: 'Clásicos Románticos',
    canciones: [
      {
        id: 'bal_1',
        titulo: 'La Incondicional',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_2',
        titulo: 'Por Amarte Así',
        artista: 'Cristian Castro',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_3',
        titulo: 'Si Nos Dejan',
        artista: 'Luis Miguel',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_4',
        titulo: 'Me Dediqué a Perderte',
        artista: 'Alejandro Fernández',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      },
      {
        id: 'bal_5',
        titulo: 'Dejaría Todo',
        artista: 'Chayanne',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_baladas'
      }
    ]
  },
  {
    id: 'la_reina',
    titulo: 'La Reina: Éxitos de la ...',
    subtitulo: 'Selena Quintanilla y Reinas de la Música Latina',
    descripcion: 'Homenaje a Selena y las grandes voces de la música hispana.',
    coverKey: 'cover_reina',
    badge: 'Tributo Legendario',
    canciones: [
      {
        id: 'reina_1',
        titulo: 'Amor Prohibido',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_2',
        titulo: 'Como La Flor',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_3',
        titulo: 'Bidi Bidi Bom Bom',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_4',
        titulo: 'Si Una Vez',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_reina'
      },
      {
        id: 'reina_5',
        titulo: 'No Me Queda Más',
        artista: 'Selena',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        storage_path: '',
        cover: 'cover_reina'
      }
    ]
  },
  {
    id: 'audiolibro',
    titulo: 'Deja de ser tú (latino): La mente crea la real...',
    subtitulo: 'Dr. Joe Dispenza (Audiolibro Completo)',
    descripcion: 'Capítulos de audio para reprogramar tu mente y transformar tu realidad.',
    coverKey: 'cover_audiolibro',
    badge: 'Audiolibro Premium',
    canciones: [
      {
        id: 'audio_1',
        titulo: 'Capítulo 1: La mente cuántica y la realidad',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_2',
        titulo: 'Capítulo 2: Superar el entorno y las emociones',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_3',
        titulo: 'Capítulo 3: El hábito de ser tú mismo',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_4',
        titulo: 'Capítulo 4: Meditación para cambiar el cerebro',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      },
      {
        id: 'audio_5',
        titulo: 'Capítulo 5: Creando tu nuevo futuro hoy',
        artista: 'Dr. Joe Dispenza',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        storage_path: '',
        cover: 'cover_audiolibro'
      }
    ]
  },
  {
    id: 'marco_antonio',
    titulo: 'Marco Antonio Solís',
    subtitulo: 'Franco De Vita, Chayanne y Los Bukis',
    descripcion: 'Las mejores poesías cantadas del maestro de maestros Marco Antonio Solís.',
    coverKey: 'cover_marco',
    badge: 'Maestros de la Música',
    canciones: [
      {
        id: 'mas_1',
        titulo: 'Si No Te Hubieras Ido',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_2',
        titulo: '¿A Dónde Vamos A Parar?',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_3',
        titulo: 'Más Que Tu Amigo',
        artista: 'Marco Antonio Solís',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        storage_path: '',
        cover: 'cover_marco'
      },
      {
        id: 'mas_4',
        titulo: 'Tu Cárcel',
        artista: 'Los Bukis',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        storage_path: '',
        cover: 'cover_marco'
      }
    ]
  },
  {
    id: 'mix_grupero',
    titulo: 'Mix de grupero',
    subtitulo: 'Eden Muñoz, Grupo Mojado, Kany García y más',
    descripcion: 'Pistas seleccionadas con la mejor energía grupera y sentimiento norteño.',
    coverKey: 'cover_grupero',
    badge: 'Mix Grupero Selección',
    canciones: [
      {
        id: 'grup_1',
        titulo: 'Chale',
        artista: 'Edén Muñoz',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_2',
        titulo: 'Tonta',
        artista: 'Grupo Mojado',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_3',
        titulo: 'Calidad',
        artista: 'Grupo Firme',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      },
      {
        id: 'grup_4',
        titulo: 'Se Me Antoja Un Tiro',
        artista: 'Edén Muñoz',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        storage_path: '',
        cover: 'cover_grupero'
      }
    ]
  }
];

// Canciones iniciales y de referencia visual de la pantalla
const initialDemoSongs: Song[] = [
  {
    id: 'demo_23',
    titulo: '23',
    artista: 'de-It, Miley Cyrus, Wiz Kh...',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    storage_path: '',
    cover: 'cover_23'
  },
  {
    id: 'demo_buchonass',
    titulo: 'buchonass',
    artista: 'El Fantasma, Los Dos Carnales, Calibre 50',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    storage_path: '',
    cover: 'cover_buchonass'
  },
  {
    id: 'demo_tus_me_gusta',
    titulo: 'Tus me gusta',
    artista: 'Lista de canciones favoritas',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    storage_path: '',
    cover: 'cover_tus_me_gusta'
  },
  {
    id: 'demo_perreale',
    titulo: 'Perreale',
    artista: 'Bad Bunny, Feid, Karol G, Anuel AA',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    storage_path: '',
    cover: 'cover_perreale'
  },
  {
    id: 'demo_lob_songs',
    titulo: 'LOB SONGS',
    artista: 'Nueva Marca, Marca Registrada, Grupo Firme',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    storage_path: '',
    cover: 'cover_lob'
  },
  {
    id: 'demo_los_2000',
    titulo: "los 2000'",
    artista: 'High School Musical, Camp Rock, Jonas Brothers',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    storage_path: '',
    cover: 'cover_2000'
  },
  {
    id: 'demo_grwm',
    titulo: 'GRWM🍒💋⭐💍',
    artista: 'Rihanna, Wiz Khalifa, Ariana Grande',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    storage_path: '',
    cover: 'cover_grwm'
  },
  {
    id: 'demo_baladas',
    titulo: 'Baladas Románticas',
    artista: 'Luis Miguel, Cristian Castro, Chayanne',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    storage_path: '',
    cover: 'cover_baladas'
  },
  {
    id: 'demo_la_reina',
    titulo: 'La Reina: Éxitos de la ...',
    artista: 'Grandes Éxitos de la Música',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    storage_path: '',
    cover: 'cover_reina'
  },
  {
    id: 'demo_audiolibro',
    titulo: 'Deja de ser tú (latino): La mente crea la real...',
    artista: 'Dr. Joe Dispenza (Audiolibro)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    storage_path: '',
    cover: 'cover_audiolibro'
  },
  {
    id: 'demo_marco_antonio',
    titulo: 'Marco Antonio Solís',
    artista: 'Franco De Vita, Chayanne y Los Bukis',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    storage_path: '',
    cover: 'cover_marco'
  },
  {
    id: 'demo_mix_grupero',
    titulo: 'Mix de grupero',
    artista: 'Eden Muñoz, Grupo Mojado, Kany García y...',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    storage_path: '',
    cover: 'cover_grupero'
  }
];

export default function App() {
  // Estado de autenticación
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('mejiamejiaaaron@gmail.com');
  const [password, setPassword] = useState<string>('Admin2026*');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Navegación por pestañas y filtros idénticos al screenshot
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'biblioteca'>('inicio');
  const [activeFilter, setActiveFilter] = useState<'Todas' | 'Música' | 'Podcasts' | 'Audiolibros'>('Todas');

  // Estado de canciones y reproductor
  const [songs, setSongs] = useState<Song[]>([]);
  const [canciones, setCanciones] = useState<Song[]>(initialDemoSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(initialDemoSongs[0]); // Pista 23 por defecto
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(215); // Duración ejemplo 3:35
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Estado de carpetas dinámicas y personalizadas
  const [folders, setFolders] = useState<AudioFolder[]>(() => {
    try {
      const saved = localStorage.getItem('fa_folders_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Error cargando carpetas guardadas:', e);
    }
    return carpetasAudio;
  });

  const saveFolders = (newFolders: AudioFolder[]) => {
    setFolders(newFolders);
    try {
      localStorage.setItem('fa_folders_v3', JSON.stringify(newFolders));
    } catch (e) {
      console.warn('Error guardando carpetas:', e);
    }
  };

  // Estado del formulario de subida y DeepSeek IA
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customArtist, setCustomArtist] = useState<string>('');
  const [customCoverUrl, setCustomCoverUrl] = useState<string>('');
  const [targetFolderId, setTargetFolderId] = useState<string>('buchonass');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiIdentifiedInfo, setAiIdentifiedInfo] = useState<{
    titulo: string;
    artista: string;
    genero: string;
    fuenteIA?: string;
  } | null>(null);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Modales de Carpetas y Reproductor
  const [selectedFolder, setSelectedFolder] = useState<AudioFolder | null>(null);
  const [folderLiked, setFolderLiked] = useState<Record<string, boolean>>({});
  const [showAddToFolderModal, setShowAddToFolderModal] = useState<boolean>(false);
  const [songToAddToFolder, setSongToAddToFolder] = useState<Song | null>(null);
  const [showChangeSongModal, setShowChangeSongModal] = useState<boolean>(false);
  const [showAddMusicToCurrentFolderModal, setShowAddMusicToCurrentFolderModal] = useState<boolean>(false);
  const [showRlsModal, setShowRlsModal] = useState<boolean>(false);
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [showInstallGuideModal, setShowInstallGuideModal] = useState<boolean>(false);
  const [deployTab, setDeployTab] = useState<'vercel' | 'netlify' | 'render' | 'android'>('vercel');
  const [copiedDeployText, setCopiedDeployText] = useState<string>('');
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [folderToDelete, setFolderToDelete] = useState<AudioFolder | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // SQL exacto para crear la tabla 'songs', RLS y bucket 'musica' en Supabase
  const rlsSql = `-- ========================================================
-- 1. CREACIÓN DE LA TABLA 'songs' EN SUPABASE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  cover_url TEXT,
  audio_url TEXT NOT NULL
);

-- Habilitar Seguridad a Nivel de Fila (RLS)
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso para lectura, inserción y borrado
DROP POLICY IF EXISTS "Permitir lectura publica de songs" ON public.songs;
CREATE POLICY "Permitir lectura publica de songs"
ON public.songs FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Permitir insercion publica de songs" ON public.songs;
CREATE POLICY "Permitir insercion publica de songs"
ON public.songs FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminacion publica de songs" ON public.songs;
CREATE POLICY "Permitir eliminacion publica de songs"
ON public.songs FOR DELETE
TO anon, authenticated
USING (true);

-- Habilitar Realtime para reflejar canciones al instante
ALTER PUBLICATION supabase_realtime ADD TABLE public.songs;

-- ========================================================
-- 2. CONFIGURACIÓN DEL BUCKET 'musica' EN STORAGE
-- ========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('musica', 'musica', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Permitir lectura en bucket musica" ON storage.objects;
CREATE POLICY "Permitir lectura en bucket musica"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'musica');

DROP POLICY IF EXISTS "Permitir subida a bucket musica" ON storage.objects;
CREATE POLICY "Permitir subida a bucket musica"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'musica');

DROP POLICY IF EXISTS "Permitir eliminar en bucket musica" ON storage.objects;
CREATE POLICY "Permitir eliminar en bucket musica"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'musica');`;

  const copyRlsSql = () => {
    navigator.clipboard.writeText(rlsSql);
    setSqlCopied(true);
    triggerToast('¡SQL copiado al portapapeles!', 'success');
    setTimeout(() => setSqlCopied(false), 3000);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDeployText(label);
    triggerToast(`¡${label} copiado al portapapeles!`, 'success');
    setTimeout(() => setCopiedDeployText(''), 2500);
  };

  // ==========================================
  // INICIALIZACIÓN: SESIÓN & CARGAR CANCIONES
  // ==========================================
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    cargarCanciones();

    const channel = supabase
      .channel('songs-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'songs' }, () => {
        cargarCanciones();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'canciones' }, () => {
        cargarCanciones();
      })
      .subscribe();

    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(checkStandalone);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      authListener.subscription.unsubscribe();
      supabase.removeChannel(channel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        triggerToast('¡FINANCIERA AARON se ha instalado en tu pantalla de inicio!', 'success');
        setDeferredPrompt(null);
      }
    } else {
      setDeployTab('android');
      setShowDeployModal(true);
    }
  };

  // Registro persistente de metadatos de canciones subidas a Supabase Storage
  const STORAGE_META_KEY = 'fa_storage_metadata_v2';

  const obtenerMetadatosLocales = (): Record<string, {
    titulo: string;
    artista: string;
    cover?: string;
    folderId?: string;
    url?: string;
    created_at?: string;
  }> => {
    try {
      const raw = localStorage.getItem(STORAGE_META_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const guardarMetadatoCancion = (
    storagePath: string,
    meta: {
      titulo: string;
      artista: string;
      cover?: string;
      folderId?: string;
      url?: string;
      created_at?: string;
    }
  ) => {
    try {
      const todos = obtenerMetadatosLocales();
      todos[storagePath] = meta;
      localStorage.setItem(STORAGE_META_KEY, JSON.stringify(todos));
    } catch (e) {
      console.warn('Error guardando metadato local:', e);
    }
  };

  const cargarCanciones = async (esReintento = false) => {
    try {
      const { data: dbSongs, error: dbError } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('dbSongs:', dbSongs);

      if (dbError) {
        console.warn('Aviso al cargar canciones desde Supabase:', dbError.message || dbError);
        // Si el schema cache de PostgREST aún se estaba actualizando (PGRST125), reintentar una vez tras breve pausa
        if (!esReintento && (dbError.code === 'PGRST125' || dbError.message?.includes('Invalid path'))) {
          setTimeout(() => {
            cargarCanciones(true);
          }, 1000);
          return;
        }
        return;
      }

      if (dbSongs) {
        // Normalizar los datos garantizando las propiedades title, artist, cover_url y audio_url
        const cancionesBD: Song[] = dbSongs.map((row: any) => ({
          id: row.id,
          title: row.title || 'Sin título',
          artist: row.artist || 'Artista',
          cover_url: row.cover_url || '',
          audio_url: row.audio_url || '',
          titulo: row.title || 'Sin título',
          artista: row.artist || 'Artista',
          cover: row.cover_url || 'cover_23',
          url: row.audio_url || '',
          storage_path: row.audio_url || '',
          created_at: row.created_at
        }));

        setSongs(cancionesBD);
        setCanciones(cancionesBD.length > 0 ? cancionesBD : initialDemoSongs);

        // Si hay canciones en la base de datos y aún no hay una seleccionada por el usuario
        if (cancionesBD.length > 0 && (!currentSong || currentSong.id === 'demo_23')) {
          setCurrentSong(cancionesBD[0]);
        }

        // Sincronizar canciones en las carpetas (especialmente 'tus_me_gusta')
        if (cancionesBD.length > 0) {
          setFolders((prevFolders) => {
            let huboCambio = false;
            const updated = prevFolders.map((f) => {
              const nuevasParaCarpeta: Song[] = [];
              for (const c of cancionesBD) {
                const pertenece = (f.id === 'tus_me_gusta');
                const yaEsta = f.canciones.some((existente) =>
                  String(existente.id) === String(c.id) ||
                  (existente.url && c.url && existente.url === c.url) ||
                  ((existente.title || existente.titulo).toLowerCase() === (c.title || c.titulo).toLowerCase() &&
                   (existente.artist || existente.artista).toLowerCase() === (c.artist || c.artista).toLowerCase())
                );

                if (pertenece && !yaEsta) {
                  nuevasParaCarpeta.push(c);
                  huboCambio = true;
                }
              }

              if (nuevasParaCarpeta.length > 0) {
                return {
                  ...f,
                  canciones: [...nuevasParaCarpeta, ...f.canciones]
                };
              }
              return f;
            });

            if (huboCambio) {
              try {
                localStorage.setItem('fa_folders_v3', JSON.stringify(updated));
              } catch (e) {}
              return updated;
            }
            return prevFolders;
          });
        }
      }
    } catch (err) {
      console.error('Error inesperado al cargar canciones:', err);
    }
  };

  // ==========================================
  // AUTENTICACIÓN
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      if (isSignUpMode) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) {
          setAuthError(error.message);
          triggerToast(`Error al registrar: ${error.message}`, 'error');
          return;
        }
        if (data?.user) {
          setUser(data.user);
          setShowLoginModal(false);
          triggerToast(`¡Usuario conectado: ${data.user.email}!`, 'success');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          setAuthError(error.message);
          triggerToast(`Error de login: ${error.message}`, 'error');
          return;
        }

        if (data?.user) {
          setUser(data.user);
          setShowLoginModal(false);
          triggerToast(`¡Bienvenido, ${data.user.email}!`, 'success');
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setAuthError(errMsg);
      triggerToast(`Error: ${errMsg}`, 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    triggerToast('Sesión cerrada correctamente', 'success');
  };

  // ==========================================
  // DEEPSEEK & GEMINI IA: ANÁLISIS DE AUDIO & FOTO RELACIONADA
  // ==========================================

  // Extrae etiquetas ID3 (v1 y v2) directamente del archivo MP3 en el navegador
  const extractAudioMetadataFromFile = async (file: File): Promise<{ title?: string; artist?: string }> => {
    try {
      // 1. Escanear encabezado ID3v2 (primeros 64KB)
      const buffer = await file.slice(0, 65536).arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let title: string | undefined;
      let artist: string | undefined;

      if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) { // 'ID3'
        const textDecoder = new TextDecoder('utf-8');
        const isoDecoder = new TextDecoder('iso-8859-1');
        let offset = 10;
        while (offset < bytes.length - 10) {
          const frameId = String.fromCharCode(bytes[offset], bytes[offset + 1], bytes[offset + 2], bytes[offset + 3]);
          if (!/^[A-Z0-9]{4}$/.test(frameId)) break;

          const frameSize =
            (bytes[offset + 4] << 24) | (bytes[offset + 5] << 16) | (bytes[offset + 6] << 8) | bytes[offset + 7];
          if (frameSize <= 0 || offset + 10 + frameSize > bytes.length) break;

          const contentBytes = bytes.slice(offset + 10, offset + 10 + frameSize);
          let val = '';
          try {
            const encoding = contentBytes[0];
            const textSlice = contentBytes.slice(1);
            val =
              encoding === 1 || encoding === 2
                ? new TextDecoder('utf-16').decode(textSlice)
                : encoding === 3
                ? textDecoder.decode(textSlice)
                : isoDecoder.decode(textSlice);
            val = val.replace(/\0/g, '').trim();
          } catch (_) {}

          if (frameId === 'TIT2' && val) title = val;
          if (frameId === 'TPE1' && val) artist = val;

          offset += 10 + frameSize;
        }
      }

      // 2. Escanear ID3v1 (últimos 128 bytes) si faltó alguno
      if ((!title || !artist) && file.size > 128) {
        const endBuffer = await file.slice(file.size - 128).arrayBuffer();
        const endBytes = new Uint8Array(endBuffer);
        if (endBytes[0] === 0x54 && endBytes[1] === 0x41 && endBytes[2] === 0x47) { // 'TAG'
          const dec = new TextDecoder('iso-8859-1');
          if (!title) {
            const rawT = dec.decode(endBytes.slice(3, 33)).replace(/\0/g, '').trim();
            if (rawT) title = rawT;
          }
          if (!artist) {
            const rawA = dec.decode(endBytes.slice(33, 63)).replace(/\0/g, '').trim();
            if (rawA) artist = rawA;
          }
        }
      }

      return { title, artist };
    } catch (e) {
      return {};
    }
  };

  // Limpieza y deducción inteligente instantánea desde el nombre del archivo
  const parseSmartAudioName = (
    rawName: string
  ): { titulo: string; artista: string; sugerenciaCarpeta: string } => {
    let clean = rawName.replace(/\.(mp3|wav|m4a|aac|flac|ogg)$/i, '');
    clean = clean.replace(/^\s*(?:\d+[\s._-]+)+/, '');
    clean = clean
      .replace(
        /\b(official\s+video|video\s+oficial|official\s+audio|audio\s+oficial|video\s+lyric|letra|lyrics|en\s+vivo|live|remix|hd|4k|1080p|hq|320kbps|128kbps|y2mate(?:\.is)?|mp3clan|snaptube|full\s+audio)\b/gi,
        ''
      )
      .replace(/[\[\(\{]\s*[\]\)\}]/g, '')
      .replace(/[_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    let artista = 'Artista';
    let titulo = clean;
    let carpeta = 'tus_me_gusta';

    const conocidos = [
      { n: ['peso pluma', 'doble p'], art: 'Peso Pluma', f: 'buchonass' },
      { n: ['natanael cano', 'nata'], art: 'Natanael Cano', f: 'buchonass' },
      { n: ['junior h'], art: 'Junior H', f: 'buchonass' },
      { n: ['fuerza regida'], art: 'Fuerza Regida', f: 'buchonass' },
      { n: ['el fantasma'], art: 'El Fantasma', f: 'buchonass' },
      { n: ['los dos carnales'], art: 'Los Dos Carnales', f: 'buchonass' },
      { n: ['luis r conriquez'], art: 'Luis R Conriquez', f: 'buchonass' },
      { n: ['calibre 50'], art: 'Calibre 50', f: 'buchonass' },
      { n: ['bad bunny'], art: 'Bad Bunny', f: 'perreale' },
      { n: ['feid', 'ferxxo'], art: 'Feid', f: 'perreale' },
      { n: ['karol g'], art: 'Karol G', f: 'perreale' },
      { n: ['anuel'], art: 'Anuel AA', f: 'perreale' },
      { n: ['grupo firme'], art: 'Grupo Firme', f: 'lob_songs' },
      { n: ['carin leon'], art: 'Carin Leon', f: 'lob_songs' },
      { n: ['grupo frontera'], art: 'Grupo Frontera', f: 'lob_songs' },
      { n: ['banda ms'], art: 'Banda MS', f: 'lob_songs' },
      { n: ['luis miguel'], art: 'Luis Miguel', f: 'baladas' },
      { n: ['chayanne'], art: 'Chayanne', f: 'baladas' },
      { n: ['selena'], art: 'Selena', f: 'la_reina' }
    ];

    const lower = clean.toLowerCase();
    const match = conocidos.find((c) => c.n.some((name) => lower.includes(name)));
    if (match) {
      artista = match.art;
      carpeta = match.f;
      let t = clean;
      for (const name of match.n) {
        t = t.replace(new RegExp(name, 'gi'), '');
      }
      t = t.replace(/^[\s\-_—–:]+|[\s\-_—–:]+$/g, '').trim();
      if (t.length > 2) titulo = t;
    } else if (clean.includes(' - ')) {
      const parts = clean.split(' - ');
      artista = parts[0].trim();
      titulo = parts.slice(1).join(' - ').trim();
    } else if (clean.includes(' — ')) {
      const parts = clean.split(' — ');
      artista = parts[0].trim();
      titulo = parts.slice(1).join(' — ').trim();
    } else if (clean.toLowerCase().includes(' by ')) {
      const parts = clean.split(/ by /i);
      titulo = parts[0].trim();
      artista = parts[1].trim();
    }

    const cap = (s: string) =>
      s
        .split(' ')
        .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : ''))
        .join(' ');
    if (titulo === titulo.toLowerCase()) titulo = cap(titulo);
    if (artista === artista.toLowerCase()) artista = cap(artista);

    return { titulo: titulo || 'Canción', artista: artista || 'Artista', sugerenciaCarpeta: carpeta };
  };

  const analizarAudioConIA = async (
    file: File,
    hintTitle?: string,
    hintArtist?: string
  ): Promise<{
    titulo: string;
    artista: string;
    genero: string;
    sugerenciaCarpeta: string;
    coverUrl: string;
    fuenteIA: string;
  } | null> => {
    setIsAiAnalyzing(true);
    try {
      const res = await fetch('/api/ai/tag-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          folderId: targetFolderId || selectedFolder?.id,
          id3Title: hintTitle || customTitle,
          id3Artist: hintArtist || customArtist
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.titulo) setCustomTitle(d.titulo);
        if (d.artista) setCustomArtist(d.artista);
        if (d.coverUrl) setCustomCoverUrl(d.coverUrl);
        if (d.sugerenciaCarpeta) setTargetFolderId(d.sugerenciaCarpeta);

        setAiIdentifiedInfo({
          titulo: d.titulo,
          artista: d.artista,
          genero: d.genero,
          fuenteIA: d.fuenteIA || 'DeepSeek / Gemini IA'
        });
        triggerToast(`✨ IA identificó: "${d.artista} - ${d.titulo}" • Portada generada`, 'success');
        return d;
      }
    } catch (err) {
      console.warn('Error en análisis IA:', err);
    } finally {
      setIsAiAnalyzing(false);
    }
    return null;
  };

  const regenerarFotoIA = () => {
    const seed = Math.floor(Math.random() * 999999);
    const prompt = encodeURIComponent(
      `${customArtist || 'Music Artist'} ${customTitle || 'Song'} stylish album art cover aesthetic vinyl masterpiece 4k`
    );
    const newCover = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true&seed=${seed}`;
    setCustomCoverUrl(newCover);
    triggerToast('¡Nueva portada generada con IA!', 'success');
  };

  // ==========================================
  // GESTIÓN DE CARPETAS (AGREGAR, QUITAR Y ELIMINAR)
  // ==========================================
  const agregarCancionACarpeta = (folderId: string, song: Song) => {
    const target = folders.find((f) => f.id === folderId);
    if (!target) return;

    const yaExiste = target.canciones.some(
      (c) => String(c.id) === String(song.id) || (c.titulo.toLowerCase() === song.titulo.toLowerCase() && c.artista.toLowerCase() === song.artista.toLowerCase())
    );

    if (yaExiste) {
      triggerToast(`"${song.titulo}" ya existe en "${target.titulo}"`, 'error');
      return;
    }

    const updated = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          canciones: [song, ...f.canciones]
        };
      }
      return f;
    });

    saveFolders(updated);
    if (selectedFolder && selectedFolder.id === folderId) {
      setSelectedFolder(updated.find((f) => f.id === folderId) || null);
    }
    triggerToast(`¡"${song.titulo}" agregada a "${target.titulo}"!`, 'success');
    setShowAddToFolderModal(false);
  };

  const quitarCancionDeCarpeta = (folderId: string, songId: string | number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const folder = folders.find((f) => f.id === folderId);
    const songName = folder?.canciones.find((c) => String(c.id) === String(songId))?.titulo || 'Canción';

    const updated = folders.map((f) => {
      if (f.id === folderId) {
        return {
          ...f,
          canciones: f.canciones.filter((c) => String(c.id) !== String(songId))
        };
      }
      return f;
    });

    saveFolders(updated);
    if (selectedFolder && selectedFolder.id === folderId) {
      setSelectedFolder(updated.find((f) => f.id === folderId) || null);
    }
    triggerToast(`"${songName}" quitada de la carpeta "${folder?.titulo || ''}"`, 'success');
  };

  const solicitarEliminarCancion = (song: Song, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSongToDelete(song);
  };

  const eliminarCancion = (song: Song, e?: React.MouseEvent) => {
    solicitarEliminarCancion(song, e);
  };

  const confirmarEliminarCancion = async () => {
    if (!songToDelete) return;
    const song = songToDelete;
    setSongToDelete(null);

    // Quitar de todas las carpetas
    const updatedFolders = folders.map((f) => ({
      ...f,
      canciones: f.canciones.filter((c) => String(c.id) !== String(song.id))
    }));
    saveFolders(updatedFolders);
    if (selectedFolder) {
      setSelectedFolder(updatedFolders.find((f) => f.id === selectedFolder.id) || null);
    }

    setSongs((prev) => prev.filter((item) => String(item.id) !== String(song.id)));
    setCanciones((prev) => prev.filter((item) => String(item.id) !== String(song.id)));
    if (currentSong?.id === song.id) {
      setCurrentSong(initialDemoSongs[0]);
      setIsPlaying(false);
    }

    try {
      if (song.storage_path) {
        await supabase.storage.from('musica').remove([song.storage_path]);
        try {
          const metadatos = obtenerMetadatosLocales();
          delete metadatos[song.storage_path];
          localStorage.setItem(STORAGE_META_KEY, JSON.stringify(metadatos));
        } catch (mErr) {}
      }
      if (!String(song.id).startsWith('local_')) {
        await supabase.from('songs').delete().eq('id', song.id);
        await supabase.from('canciones').delete().eq('id', song.id);
      }
    } catch (err: unknown) {
      console.warn('Nota al eliminar de Supabase:', err);
    }
    triggerToast(`"${song.titulo}" ha sido eliminada permanentemente.`, 'success');
  };

  const solicitarEliminarCarpeta = (folder: AudioFolder, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFolderToDelete(folder);
  };

  const confirmarEliminarCarpeta = () => {
    if (!folderToDelete) return;
    const fId = folderToDelete.id;
    const fName = folderToDelete.titulo;
    setFolderToDelete(null);

    const updated = folders.filter((f) => f.id !== fId);
    saveFolders(updated);
    if (selectedFolder?.id === fId) {
      setSelectedFolder(null);
    }
    triggerToast(`Carpeta "${fName}" eliminada exitosamente.`, 'success');
  };

  // ==========================================
  // SUBIDA AL STORAGE SUPABASE CON DEEPSEEK & GEMINI IA
  // ==========================================
  async function subirCancion(file: File) {
    if (!file) {
      alert('Por favor selecciona un archivo de audio MP3.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('✨ IA reconociendo título y artista musical...');

    let songTitle = customTitle.trim();
    let songArtist = customArtist.trim();
    let finalCover = (coverPreviewUrl || customCoverUrl || '').trim();

    // 1. Si el usuario sube directamente o aún no ha terminado el análisis de la IA:
    if (!songTitle || !songArtist || songArtist.toLowerCase() === 'desconocido' || isAiAnalyzing) {
      try {
        const id3 = await extractAudioMetadataFromFile(file);
        const fast = parseSmartAudioName(file.name);
        const aiData = await analizarAudioConIA(file, id3.title || fast.titulo, id3.artist || fast.artista);

        if (aiData) {
          if (!songTitle || songTitle === file.name) songTitle = aiData.titulo;
          if (!songArtist || songArtist.toLowerCase() === 'desconocido') songArtist = aiData.artista;
          if (!finalCover) finalCover = aiData.coverUrl || '';
          if (aiData.sugerenciaCarpeta && (!targetFolderId || targetFolderId === 'buchonass')) {
            setTargetFolderId(aiData.sugerenciaCarpeta);
          }
        }
      } catch (aiErr) {
        console.warn('Nota en análisis de IA durante subida:', aiErr);
      }
    }

    // 2. Respaldo inteligente si la IA o la red no respondieron: nunca dejar "Desconocido"
    if (!songTitle || !songArtist || songArtist.toLowerCase() === 'desconocido') {
      const fast = parseSmartAudioName(file.name);
      if (!songTitle) songTitle = fast.titulo;
      if (!songArtist || songArtist.toLowerCase() === 'desconocido') songArtist = fast.artista;
      if (!targetFolderId && fast.sugerenciaCarpeta) setTargetFolderId(fast.sugerenciaCarpeta);
    }

    if (!songTitle) songTitle = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
    if (!songArtist || songArtist.toLowerCase() === 'desconocido') songArtist = 'Artista';

    // 3. Subir imagen de portada al bucket 'musica' si el usuario seleccionó un archivo de imagen
    if (coverFile) {
      try {
        setUploadStatus('Subiendo imagen de portada a Supabase Storage...');
        const sanitizedCover = coverFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const coverPath = `covers/${Date.now()}_${sanitizedCover}`;
        const { error: coverErr } = await supabase.storage
          .from('musica')
          .upload(coverPath, coverFile, {
            cacheControl: '3600',
            upsert: true,
            contentType: coverFile.type || 'image/jpeg'
          });

        if (!coverErr) {
          const { data: cUrlData } = supabase.storage.from('musica').getPublicUrl(coverPath);
          if (cUrlData?.publicUrl) {
            finalCover = cUrlData.publicUrl;
          }
        } else {
          console.warn('Nota al subir imagen de portada:', coverErr.message);
        }
      } catch (cErr) {
        console.warn('Error subiendo imagen de portada:', cErr);
      }
    }

    if (!finalCover) {
      const promptClean = encodeURIComponent(`${songArtist} ${songTitle} album cover art masterpiece vibrant 4k`);
      finalCover = `https://image.pollinations.ai/prompt/${promptClean}?width=512&height=512&nologo=true`;
    }

    setUploadStatus(`Subiendo archivo de audio "${songTitle}" a Supabase...`);

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const ruta = `${Date.now()}_${sanitizedName}`;
      const localAudioUrl = URL.createObjectURL(file);
      let publicUrl = '';

      // 1. Intentar subir audio al bucket 'musica' en Supabase Storage
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('musica')
          .upload(ruta, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type || 'audio/mpeg'
          });

        if (uploadError) {
          console.warn('Aviso de Storage (bucket musica):', uploadError.message || uploadError);
          // Si el bucket musica aún no ha sido creado en el panel de Supabase
          if (uploadError.message?.includes('Invalid path') || (uploadError as any).statusCode === '404') {
            setShowRlsModal(true);
            triggerToast('Aviso: El bucket "musica" debe crearse en Supabase Storage como Público.', 'error');
          }
        } else {
          const { data: urlData } = supabase.storage.from('musica').getPublicUrl(ruta);
          publicUrl = urlData?.publicUrl || '';
        }
      } catch (storageErr: any) {
        console.warn('Nota al conectar con Supabase Storage:', storageErr?.message || storageErr);
      }

      // La URL reproducible será la pública de Supabase o la URL local de respaldo
      const finalAudioUrl = publicUrl || localAudioUrl;

      // 2. INSERT directo en la tabla 'songs' de Supabase
      setUploadStatus(`Guardando "${songTitle}" en la base de datos...`);
      let dbRecord: any = null;
      try {
        const { data: songInserted, error: insertError } = await supabase
          .from('songs')
          .insert([
            {
              title: songTitle,
              artist: songArtist,
              cover_url: finalCover,
              audio_url: finalAudioUrl
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.warn('Nota en INSERT de tabla songs:', insertError.message || insertError);
        } else {
          dbRecord = songInserted;
        }
      } catch (insertErr) {
        console.warn('Excepción al insertar en tabla songs:', insertErr);
      }

      const nuevaCancion: Song = {
        id: dbRecord?.id || ('sb_' + ruta),
        title: songTitle,
        artist: songArtist,
        titulo: songTitle,
        artista: songArtist,
        cover_url: finalCover,
        cover: finalCover,
        audio_url: finalAudioUrl,
        url: finalAudioUrl,
        storage_path: ruta,
        created_at: dbRecord?.created_at || new Date().toISOString()
      };

      // 3. Guardar metadatos locales como respaldo adicional
      guardarMetadatoCancion(ruta, {
        titulo: songTitle,
        artista: songArtist,
        cover: finalCover,
        folderId: targetFolderId,
        url: finalAudioUrl,
        created_at: nuevaCancion.created_at || new Date().toISOString()
      });

      // 4. Agregar a la carpeta seleccionada (ej. buchonass, perreale, tus_me_gusta)
      if (targetFolderId) {
        agregarCancionACarpeta(targetFolderId, nuevaCancion);
      }

      // 5. Actualizar los estados de la interfaz
      setSongs((prev) => [nuevaCancion, ...prev.filter((s) => String(s.id) !== String(nuevaCancion.id))]);
      setCanciones((prev) => [nuevaCancion, ...prev.filter((s) => String(s.id) !== String(nuevaCancion.id))]);

      setCurrentSong(nuevaCancion);
      setIsPlaying(true);

      if (publicUrl) {
        triggerToast(`✨ ¡"${songTitle}" por ${songArtist} guardada exitosamente en la nube!`, 'success');
      } else {
        triggerToast(`✨ Reproduciendo "${songTitle}". Crea el bucket 'musica' en Supabase para almacenamiento permanente.`, 'success');
      }

      setShowUploadModal(false);
      setSelectedFile(null);
      setCoverFile(null);
      setCoverPreviewUrl('');
      setCustomTitle('');
      setCustomArtist('');
      setCustomCoverUrl('');
      setAiIdentifiedInfo(null);
    } catch (error: any) {
      console.warn('Aviso en subirCancion:', error);

      const localAudioUrl = URL.createObjectURL(file);
      const cancionRespaldo: Song = {
        id: 'local_' + Date.now(),
        title: songTitle,
        artist: songArtist,
        titulo: songTitle,
        artista: songArtist,
        cover_url: finalCover,
        cover: finalCover,
        audio_url: localAudioUrl,
        url: localAudioUrl,
        storage_path: '',
        created_at: new Date().toISOString()
      };

      setSongs((prev) => [cancionRespaldo, ...prev]);
      setCanciones((prev) => [cancionRespaldo, ...prev]);
      setCurrentSong(cancionRespaldo);
      setIsPlaying(true);

      if (targetFolderId) {
        agregarCancionACarpeta(targetFolderId, cancionRespaldo);
      }

      setShowUploadModal(false);
      setSelectedFile(null);
      setCoverFile(null);
      setCoverPreviewUrl('');
      setCustomTitle('');
      setCustomArtist('');
      setCustomCoverUrl('');
      setAiIdentifiedInfo(null);
      triggerToast(`✨ Reproduciendo "${songTitle}" de ${songArtist}`, 'success');
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  }

  // ==========================================
  // CONTROLES DE REPRODUCCIÓN
  // ==========================================
  const seleccionarCancion = (song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Error al reproducir audio:', err));
    }
  };

  const reproducirSiguiente = () => {
    if (canciones.length === 0) return;
    const currentIndex = canciones.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % canciones.length;
    setCurrentSong(canciones[nextIndex]);
    setIsPlaying(true);
  };

  const reproducirAnterior = () => {
    if (canciones.length === 0) return;
    const currentIndex = canciones.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + canciones.length) % canciones.length;
    setCurrentSong(canciones[prevIndex]);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.85;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (segundos: number) => {
    if (isNaN(segundos)) return '00:00';
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current && (currentSong?.audio_url || currentSong?.url)) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.warn('Reproducción diferida:', e));
      }
    }
  }, [currentSong]);

  const listaParaBuscar = songs.length > 0 ? songs : canciones;
  const filteredSongs = listaParaBuscar.filter(
    (c) =>
      (c.title || c.titulo || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.artist || c.artista || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // ARTWORK THUMBNAILS (COVERS IDÉNTICOS AL SCREENSHOT)
  // ==========================================
  const renderCover = (coverType?: string, className: string = 'w-14 h-14') => {
    if (coverType && (coverType.startsWith('http://') || coverType.startsWith('https://') || coverType.startsWith('data:image') || coverType.startsWith('/'))) {
      return (
        <div className={`${className} shrink-0 rounded-l-md overflow-hidden relative shadow bg-neutral-900 border border-white/10`}>
          <img src={coverType} alt="Portada" className="w-full h-full object-cover" />
        </div>
      );
    }

    switch (coverType) {
      case 'cover_buchonass':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-900 rounded-l-md overflow-hidden relative shadow`}>
            <div className="bg-[#b45309] text-[7px] font-black text-amber-200 flex items-center justify-center p-0.5 text-center leading-tight">
              EL TÓXICO
            </div>
            <div className="bg-[#1e3a8a] text-[7px] font-black text-blue-200 flex items-center justify-center p-0.5 text-center leading-tight">
              RECODITOS
            </div>
            <div className="bg-[#451a03] text-[7px] font-black text-amber-100 flex items-center justify-center p-0.5 text-center leading-tight">
              PUERTO
            </div>
            <div className="bg-[#172554] text-[7px] font-black text-white flex items-center justify-center p-0.5 text-center leading-tight">
              FANTASÍA
            </div>
          </div>
        );

      case 'cover_tus_me_gusta':
        return (
          <div className={`${className} bg-gradient-to-br from-[#4c1d95] via-[#6366f1] to-[#3b82f6] flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <Heart className="w-6 h-6 text-white fill-current drop-shadow" />
          </div>
        );

      case 'cover_perreale':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-950 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-red-700 text-[6px] font-black text-yellow-300 flex items-center justify-center">PLAYER</div>
            <div className="bg-neutral-900 text-[8px] font-black text-red-500 flex items-center justify-center">23</div>
            <div className="bg-pink-700 text-[6px] font-black text-white flex items-center justify-center">PERREO</div>
            <div className="bg-red-600 text-[6px] font-black text-white flex items-center justify-center">GUETTA</div>
          </div>
        );

      case 'cover_lob':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-[#1c1917] rounded-l-md overflow-hidden shadow`}>
            <div className="bg-[#292524] text-[6px] font-bold text-amber-300 flex items-center justify-center">NUEVA</div>
            <div className="bg-[#44403c] text-[6px] font-bold text-white flex items-center justify-center">COVERS</div>
            <div className="bg-[#1c1917] text-[6px] font-bold text-amber-400 flex items-center justify-center">REGISTRADA</div>
            <div className="bg-[#0c0a09] text-[6px] font-bold text-yellow-500 flex items-center justify-center">FIRME</div>
          </div>
        );

      case 'cover_2000':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-900 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-rose-600 text-[6px] font-black text-white flex items-center justify-center">HSM</div>
            <div className="bg-amber-500 text-[6px] font-black text-neutral-900 flex items-center justify-center">CAMP</div>
            <div className="bg-cyan-600 text-[6px] font-black text-white flex items-center justify-center">POP</div>
            <div className="bg-indigo-600 text-[6px] font-black text-white flex items-center justify-center">ROCK</div>
          </div>
        );

      case 'cover_grwm':
        return (
          <div className={`${className} grid grid-cols-2 grid-rows-2 shrink-0 bg-neutral-950 rounded-l-md overflow-hidden shadow`}>
            <div className="bg-neutral-800 text-[6px] font-bold text-gray-300 flex items-center justify-center">DERULO</div>
            <div className="bg-neutral-900 text-[6px] font-bold text-pink-400 flex items-center justify-center">RIHANNA</div>
            <div className="bg-stone-900 text-[6px] font-bold text-amber-200 flex items-center justify-center">YOUNG</div>
            <div className="bg-neutral-800 text-[6px] font-bold text-white flex items-center justify-center">WIZ</div>
          </div>
        );

      case 'cover_baladas':
        return (
          <div className={`${className} bg-gradient-to-tr from-[#881337] via-[#e11d48] to-[#9f1239] flex flex-col items-center justify-center p-1 shrink-0 rounded-l-md shadow relative`}>
            <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-white/40 flex items-center justify-center text-[5px]">●</div>
            <span className="text-[7px] text-white font-extrabold text-center leading-none mt-2">
              Baladas<br />Románticas
            </span>
          </div>
        );

      case 'cover_reina':
        return (
          <div className={`${className} bg-[#262626] border border-white/5 flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <ImageIcon className="w-6 h-6 text-gray-400 stroke-[1.5]" />
          </div>
        );

      case 'cover_23':
        return (
          <div className={`${className} bg-[#881337] border border-white/20 flex flex-col items-center justify-center p-1 shrink-0 rounded shadow`}>
            <span className="text-[14px] font-black text-white tracking-tighter leading-none">23</span>
            <span className="text-[6px] font-bold text-red-200 uppercase tracking-widest mt-0.5">MIKE WILL</span>
          </div>
        );

      default:
        return (
          <div className={`${className} bg-gradient-to-br from-[#1E90FF] to-[#E91E63] flex items-center justify-center shrink-0 rounded-l-md shadow`}>
            <Music className="w-6 h-6 text-white" />
          </div>
        );
    }
  };
  // ==========================================
  // GESTIÓN DE CARPETAS DE AUDIOS (PLAYLISTS)
  // ==========================================

  const obtenerCancionesCarpeta = (folder: AudioFolder): Song[] => {
    const currentFolderData = folders.find((f) => f.id === folder.id) || folder;
    if (folder.id === 'tus_me_gusta') {
      const cancionesSubidas = canciones.filter(
        (c) => !initialDemoSongs.some((demo) => demo.id === c.id)
      );
      const ids = new Set(currentFolderData.canciones.map((c) => String(c.id)));
      const extras = cancionesSubidas.filter((c) => !ids.has(String(c.id)));
      return [...extras, ...currentFolderData.canciones];
    }
    return currentFolderData.canciones;
  };

  const toggleLikeFolder = (folderId: string) => {
    setFolderLiked((prev) => {
      const nextVal = !prev[folderId];
      triggerToast(
        nextVal ? 'Carpeta guardada en tus favoritas' : 'Carpeta eliminada de favoritas',
        'success'
      );
      return { ...prev, [folderId]: nextVal };
    });
  };

  // Renderizar la vista detallada de la carpeta de audios
  const renderFolderView = (folder: AudioFolder) => {
    const currentFolderState = folders.find((f) => f.id === folder.id) || folder;
    const cancionesCarpeta = obtenerCancionesCarpeta(currentFolderState);
    const estaReproduciendoCarpeta = cancionesCarpeta.some(
      (c) => c.id === currentSong?.id && isPlaying
    );

    return (
      <div className="space-y-6 animate-fade-in pb-16">
        {/* Barra superior de navegación dentro de la carpeta */}
        <div className="flex items-center justify-between sticky top-0 bg-[#121212]/95 backdrop-blur-md py-3 z-20 border-b border-white/5">
          <button
            onClick={() => setSelectedFolder(null)}
            className="flex items-center gap-2 text-sm font-bold text-gray-200 hover:text-white bg-[#222222] hover:bg-[#2e2e2e] px-4 py-2 rounded-full transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
            <span>Volver a Inicio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {currentFolderState.badge || 'Carpeta de Audios'}
            </span>
          </div>
        </div>

        {/* Encabezado / Hero de la Carpeta */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 pt-2">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-2xl shrink-0 ring-1 ring-white/10 flex items-center justify-center bg-[#1c1c1e]">
            {renderCover(currentFolderState.coverKey, 'w-full h-full object-cover')}
          </div>

          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
              <span>FINANCIERA AARON</span>
              <span>•</span>
              <span>CARPETA DE AUDIOS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-1.5 leading-tight tracking-tight">
              {currentFolderState.titulo}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mt-2 font-medium line-clamp-2">
              {currentFolderState.subtitulo}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">
              {currentFolderState.descripcion}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-gray-300 mt-3.5 font-medium flex-wrap">
              <span className="text-white font-black bg-white/10 px-2.5 py-0.5 rounded-md">{cancionesCarpeta.length} audios</span>
              <span>•</span>
              <span>Audio HQ 320kbps</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Reproducción Inmediata</span>
            </div>
          </div>
        </div>

        {/* Barra de Acciones de la Carpeta */}
        <div className="flex flex-wrap items-center gap-3 py-3 border-y border-white/10">
          {/* Botón Play grande */}
          <button
            onClick={() => {
              if (cancionesCarpeta.length > 0) {
                seleccionarCancion(cancionesCarpeta[0]);
              }
            }}
            className="w-14 h-14 rounded-full bg-[#1ED760] hover:bg-[#1db954] text-black flex items-center justify-center shadow-xl active:scale-95 transition"
            title="Reproducir todos los audios"
          >
            {estaReproduciendoCarpeta ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-0.5" />
            )}
          </button>

          {/* Botón Like de Carpeta */}
          <button
            onClick={() => toggleLikeFolder(currentFolderState.id)}
            className={`p-3 rounded-full border transition ${
              folderLiked[currentFolderState.id]
                ? 'text-[#1ED760] border-[#1ED760]/40 bg-emerald-500/10'
                : 'text-gray-400 hover:text-white border-white/10 hover:border-white/30'
            }`}
            title="Guardar en favoritos"
          >
            <Heart className={`w-5 h-5 ${folderLiked[currentFolderState.id] ? 'fill-current' : ''}`} />
          </button>

          {/* Botón 1: Agregar música a esta carpeta (de la biblioteca) */}
          <button
            onClick={() => {
              setSelectedFolder(currentFolderState);
              setShowAddMusicToCurrentFolderModal(true);
            }}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-lg transition active:scale-95"
            title="Agregar canciones existentes de la biblioteca a esta carpeta"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Agregar música</span>
          </button>

          {/* Botón 2: Subir MP3 con DeepSeek IA a esta carpeta */}
          <button
            onClick={() => {
              setTargetFolderId(currentFolderState.id);
              setCustomArtist(currentFolderState.titulo);
              setShowUploadModal(true);
            }}
            className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white flex items-center gap-2 shadow-lg transition active:scale-95"
            title="Subir un archivo MP3 e identificarlo con IA para esta carpeta"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Subir MP3 con IA</span>
          </button>
        </div>

        {/* Lista de Pistas / Audios de la Carpeta */}
        <div className="space-y-1.5">
          <div className="px-3 py-2 flex items-center text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/5">
            <span className="w-8 text-center">#</span>
            <span className="flex-1">Título y Artista</span>
            <span className="w-28 text-right pr-2">Acciones</span>
          </div>

          {cancionesCarpeta.length === 0 ? (
            <div className="p-10 text-center bg-[#181818] rounded-2xl border border-white/5 text-gray-400 space-y-3">
              <Folder className="w-12 h-12 mx-auto text-gray-500" />
              <p className="text-base font-bold text-white">Esta carpeta aún no tiene canciones</p>
              <p className="text-xs sm:text-sm max-w-sm mx-auto">
                Toca en <strong className="text-blue-400">&quot;+ Agregar música&quot;</strong> para elegir canciones o en <strong className="text-pink-400">&quot;Subir MP3 con IA&quot;</strong>.
              </p>
              <div className="flex justify-center gap-2.5 pt-2">
                <button
                  onClick={() => setShowAddMusicToCurrentFolderModal(true)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white hover:bg-blue-500 transition"
                >
                  Elegir de la biblioteca
                </button>
              </div>
            </div>
          ) : (
            cancionesCarpeta.map((cancion, idx) => {
              const esActual = currentSong?.id === cancion.id;
              const sonando = esActual && isPlaying;

              return (
                <div
                  key={cancion.id}
                  onClick={() => seleccionarCancion(cancion)}
                  className={`group flex items-center px-3 py-3 rounded-xl cursor-pointer transition select-none ${
                    esActual
                      ? 'bg-white/10 text-white border border-emerald-500/30'
                      : 'hover:bg-white/5 text-gray-200'
                  }`}
                >
                  {/* Número o Indicador de reproducción */}
                  <div className="w-8 flex items-center justify-center shrink-0">
                    {sonando ? (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-[#1ED760] h-full animate-bounce rounded-full" />
                        <span className="w-1 bg-[#1ED760] h-2.5 animate-bounce rounded-full [animation-delay:0.2s]" />
                        <span className="w-1 bg-[#1ED760] h-3.5 animate-bounce rounded-full [animation-delay:0.4s]" />
                      </div>
                    ) : (
                      <span className={`text-sm font-semibold ${esActual ? 'text-[#1ED760]' : 'text-gray-400 group-hover:hidden'}`}>
                        {idx + 1}
                      </span>
                    )}
                    {!sonando && (
                      <Play className="w-4 h-4 text-white hidden group-hover:block ml-0.5 fill-current" />
                    )}
                  </div>

                  {/* Portada miniatura */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 mx-2.5 shadow bg-neutral-800">
                    {renderCover(cancion.cover_url || cancion.cover || currentFolderState.coverKey, 'w-full h-full object-cover')}
                  </div>

                  {/* Datos de la Pista (Letras un poco más grandes) */}
                  <div className="flex-1 min-w-0 pr-2">
                    <p
                      className={`text-sm sm:text-base font-bold truncate leading-tight ${
                        esActual ? 'text-[#1ED760]' : 'text-white'
                      }`}
                    >
                      {cancion.title || cancion.titulo}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 truncate mt-0.5 font-medium">
                      {cancion.artist || cancion.artista}
                    </p>
                  </div>

                  {/* Botones de acción: Quitar de carpeta y Eliminar */}
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    {/* Botón: Quitar de esta carpeta */}
                    <button
                      onClick={(e) => quitarCancionDeCarpeta(currentFolderState.id, cancion.id, e)}
                      className="p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 rounded-lg transition"
                      title="Quitar de esta carpeta"
                    >
                      <MinusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Botón: Eliminar canción permanentemente */}
                    <button
                      onClick={(e) => eliminarCancion(cancion, e)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                      title="Eliminar canción permanentemente"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col h-screen w-screen bg-[#121212] text-white font-sans overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Elemento de Audio Nativo HTML5 */}
      <audio
        ref={audioRef}
        src={currentSong?.audio_url || currentSong?.url || undefined}
        controlsList="nodownload noplaybackrate"
        onTimeUpdate={handleTimeUpdate}
        onEnded={reproducirSiguiente}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="hidden"
      />

      {/* ==========================================
          BARRA DE ESTADO ANDROID (IDÉNTICA AL SCREENSHOT: 7:24, POSPUESTO HASTA, 99%)
          ========================================== */}
      <div className="w-full bg-[#121212] px-4 pt-2 pb-1.5 flex items-center justify-between text-xs text-gray-300 font-semibold shrink-0 z-30">
        <div className="text-sm font-bold text-white tracking-tight">7:24</div>

        {/* Píldora de alarma central del screenshot */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b]/70 border border-slate-700/60 text-slate-200 text-[11px] shadow-sm">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium truncate max-w-[150px]">Pospuesto hasta</span>
        </div>

        {/* Notificaciones e Icono de Financiera Aaron + Batería 99% */}
        <div className="flex items-center gap-2">
          {/* Badge Monograma FA */}
          <div
            onClick={() => setShowDeployModal(true)}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-600 to-blue-600 flex items-center justify-center text-[9px] font-black text-white cursor-pointer ring-1 ring-white/30"
            title="Publicar en tu propia URL / Opciones"
          >
            FA
          </div>
          <div className="flex items-center gap-0.5 text-white text-[11px] font-bold">
            <span>99</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          BARRA SUPERIOR DE FILTROS (AVATAR + TODAS + MÚSICA + PODCASTS + AUDIOLIBROS)
          ========================================== */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 z-20">
        {/* Avatar Usuario */}
        <div
          onClick={() => {
            if (!user) setShowLoginModal(true);
            else setShowDeployModal(true);
          }}
          className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer border border-white/20 active:scale-95 transition"
          title={user ? user.email : 'Iniciar Sesión'}
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Usuario"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Píldora "Todas" (Verde brillante Spotify #1ED760 con texto negro) */}
        <button
          onClick={() => setActiveFilter('Todas')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
            activeFilter === 'Todas'
              ? 'bg-[#1ED760] text-black shadow-sm'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Todas
        </button>

        {/* Píldora "Música" */}
        <button
          onClick={() => setActiveFilter('Música')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Música'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Música
        </button>

        {/* Píldora "Podcasts" */}
        <button
          onClick={() => setActiveFilter('Podcasts')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Podcasts'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Podcasts
        </button>

        {/* Píldora "Audiolibros" */}
        <button
          onClick={() => setActiveFilter('Audiolibros')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
            activeFilter === 'Audiolibros'
              ? 'bg-[#1ED760] text-black shadow-sm font-bold'
              : 'bg-[#2A2A2A] text-white hover:bg-[#333333]'
          }`}
        >
          Audiolibros
        </button>

        {/* Botón rápido Instalar PWA en Celular */}
        <button
          onClick={handleInstallPWA}
          className="ml-auto px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1ED760]/10 hover:bg-[#1ED760]/20 text-[#1ED760] border border-[#1ED760]/40 flex items-center gap-1 shrink-0 transition shadow-sm active:scale-95"
          title="Instalar en celular Android con su propio icono"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#1ED760]" />
          <span>Instalar App</span>
        </button>

        {/* Botón rápido publicar URL independiente */}
        <button
          onClick={() => setShowDeployModal(true)}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 hover:text-white border border-blue-500/40 flex items-center gap-1 shrink-0 transition active:scale-95 shadow-sm"
          title="Publicar en tu propia URL independiente fuera de AI Studio"
        >
          <Rocket className="w-3.5 h-3.5 text-blue-400" />
          <span>Web Propia</span>
        </button>
      </div>

      {/* ==========================================
          CONTENEDOR PRINCIPAL SCROLLABLE (PANTALLA DE INICIO SPOTIFY O VISTA DE CARPETA)
          ========================================== */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pb-36 pt-1 space-y-6">
        {selectedFolder ? (
          renderFolderView(selectedFolder)
        ) : activeTab === 'inicio' ? (
          <>
            {/* ==========================================
                1. GRID 2x4 DE ACCESO RÁPIDO (8 CARPETAS DE AUDIOS IDÉNTICAS AL SCREENSHOT)
                ========================================== */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {folders.slice(0, 8).map((folder) => {
                const count = obtenerCancionesCarpeta(folder).length;
                return (
                  <div
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="group flex items-center bg-[#282828] hover:bg-[#333333] rounded-lg overflow-hidden cursor-pointer transition active:scale-[0.98] shadow-md hover:ring-1 hover:ring-white/20 min-h-[62px]"
                    title={`Abrir carpeta de audios ${folder.titulo}`}
                  >
                    {renderCover(folder.coverKey, 'w-16 h-16')}
                    <div className="flex-1 px-3 min-w-0">
                      <span className="text-sm font-black text-white line-clamp-2 leading-tight">
                        {folder.titulo}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold block mt-0.5">
                        {count} {count === 1 ? 'audio' : 'audios'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ==========================================
                2. SECCIÓN: SUMÉRGETE EN UN AUDIOLIBRO (CARPETA DE AUDIOLIBRO)
                ========================================== */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sumérgete en un audiolibro
              </h2>

              <div
                onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'audiolibro') || null)}
                className="bg-[#242424] hover:bg-[#2b2b2b] rounded-xl p-3 sm:p-4 flex gap-3.5 sm:gap-4 items-center cursor-pointer transition shadow-lg relative group hover:ring-1 hover:ring-white/10"
                title="Abrir audiolibro completo con todos sus capítulos"
              >
                {/* Portada grande con icono de audiolibro/antena */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#202020] border border-white/5 rounded-lg flex items-center justify-center shrink-0 shadow-inner">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center relative">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    </div>
                    {/* Antena / soporte inferior */}
                    <div className="absolute -bottom-2 w-1 h-3 bg-gray-400" />
                  </div>
                </div>

                {/* Detalles del Audiolibro */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1ED760]">
                        Incluido en Premium
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFolder(carpetasAudio.find((f) => f.id === 'audiolibro') || null);
                        }}
                        className="text-gray-400 hover:text-white p-1"
                        title="Ver capítulos"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mt-1 leading-snug line-clamp-2">
                      Deja de ser tú (latino): La mente crea la real...
                    </h3>
                  </div>

                  {/* Botones inferiores: (+) y Play redondo blanco con triángulo negro */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast('Guardado en Tu Biblioteca', 'success');
                      }}
                      className="text-gray-300 hover:text-white p-1 rounded-full transition"
                      title="Agregar a tu biblioteca"
                    >
                      <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const folder = carpetasAudio.find((f) => f.id === 'audiolibro');
                        if (folder && folder.canciones.length > 0) {
                          seleccionarCancion(folder.canciones[0]);
                        }
                      }}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-black flex items-center justify-center shadow-lg active:scale-95 transition"
                      title="Reproducir audiolibro"
                    >
                      {currentSong?.id === 'audio_1' && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                3. SECCIÓN: SIGUE REPRODUCIENDO (CARRUSEL HORIZONTAL DE CARPETAS)
                ========================================== */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sigue reproduciendo
              </h2>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1">
                {/* Tarjeta Carrusel 1: Marco Antonio Solís */}
                <div
                  onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'marco_antonio') || null)}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group"
                  title="Abrir carpeta de Marco Antonio Solís"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-2.5 bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80"
                      alt="Marco Antonio Solís"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Marca de agua Spotify idéntica al screenshot */}
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Music className="w-3 h-3 text-[#1ED760]" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">Marco Antonio Solís</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Franco De Vita, Chayanne y Los Bukis
                  </p>
                </div>

                {/* Tarjeta Carrusel 2: Mix de grupero */}
                <div
                  onClick={() => setSelectedFolder(carpetasAudio.find((f) => f.id === 'mix_grupero') || null)}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group"
                  title="Abrir carpeta de Mix de grupero"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-2.5 bg-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80"
                      alt="Mix de grupero"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {/* Marca de agua Spotify idéntica al screenshot */}
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Music className="w-3 h-3 text-[#1ED760]" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white truncate">Mix de grupero</h4>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Eden Muñoz, Grupo Mojado, Kany García y...
                  </p>
                </div>

                {/* Tarjeta Carrusel 3: Tus Canciones en Supabase */}
                <div
                  onClick={() => setActiveTab('biblioteca')}
                  className="w-44 sm:w-48 shrink-0 bg-[#181818] hover:bg-[#222222] p-3 rounded-xl cursor-pointer transition shadow group flex flex-col justify-between"
                  title="Ver canciones subidas a Supabase"
                >
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-tr from-blue-700 via-pink-600 to-red-600 flex items-center justify-center mb-2.5 relative shadow-inner">
                    <Music className="w-12 h-12 text-white animate-pulse" />
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white truncate">Tu Nube Supabase</h4>
                    <p className="text-xs text-blue-400 truncate mt-0.5 font-medium">
                      {canciones.filter((c) => c.storage_path).length} pistas subidas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* ==========================================
            PESTAÑA: BUSCAR
            ========================================== */}
        {activeTab === 'buscar' && (
          <div className="space-y-4 pt-1">
            <h2 className="text-2xl font-black text-white">Buscar</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="¿Qué deseas escuchar?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#242424] border border-[#333333] rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#1ED760] transition"
              />
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-300">Pistas y Artistas disponibles</h3>
              {filteredSongs.map((cancion) => (
                <div
                  key={cancion.id}
                  onClick={() => seleccionarCancion(cancion)}
                  className="flex items-center justify-between p-2.5 bg-[#1C1C1C] hover:bg-[#242424] rounded-lg cursor-pointer transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {renderCover(cancion.cover_url || cancion.cover, 'w-10 h-10')}
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${currentSong?.id === cancion.id ? 'text-[#1ED760]' : 'text-white'}`}>
                        {cancion.title || cancion.titulo}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{cancion.artist || cancion.artista}</p>
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            PESTAÑA: TU BIBLIOTECA (SUPABASE STORAGE)
            ========================================== */}
        {activeTab === 'biblioteca' && (
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Tu biblioteca</h2>
                <p className="text-xs text-blue-400 font-medium">Supabase Bucket: musica</p>
              </div>
              <button
                onClick={() => {
                  if (!user) setShowLoginModal(true);
                  else setShowUploadModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-[#1ED760] hover:bg-[#1db954] text-black font-bold text-xs flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Subir MP3</span>
              </button>
            </div>

            {/* Tarjeta de estado de sesión admin */}
            <div className="p-3 bg-[#1C1C1E] border border-white/10 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white">
                    {user ? user.email : 'Modo Visitante'}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {user ? 'Sesión de Administrador iniciada' : 'Inicia sesión para administrar archivos'}
                  </p>
                </div>
              </div>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-red-950/60 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-900/60 transition"
                >
                  Cerrar
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  Ingresar
                </button>
              )}
            </div>

            {/* Lista de canciones de Supabase */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-300">Pistas en la nube (Tabla 'songs')</h3>
                {songs.length > 0 && (
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {songs.length} canciones
                  </span>
                )}
              </div>

              {(songs.length > 0 ? songs : canciones).map((song) => {
                const isSelected = currentSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => seleccionarCancion(song)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                      isSelected ? 'bg-[#202020] border border-[#1ED760]/60' : 'bg-[#181818] hover:bg-[#222222]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderCover(song.cover_url || song.cover, 'w-11 h-11')}
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-[#1ED760]' : 'text-white'}`}>
                          {song.title || song.titulo}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">{song.artist || song.artista}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => solicitarEliminarCancion(song, e)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                        title="Eliminar canción"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          seleccionarCancion(song);
                        }}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          MINI PLAYER FLOTANTE (DONDE SE DA PLAY)
          Con opción de agregar a cualquier carpeta y cambiar música directamente desde aquí
          ========================================== */}
      <div className="fixed bottom-16 sm:bottom-18 left-2 right-2 sm:left-4 sm:right-4 z-40">
        <div className="bg-gradient-to-r from-[#580816] via-[#6a0a1c] to-[#450510] rounded-xl p-2.5 sm:p-3 flex items-center justify-between shadow-2xl transition border border-red-900/50 relative overflow-hidden backdrop-blur-md">
          {/* Barra de progreso sutil en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-[#1ED760] transition-all duration-200"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          {/* Izquierda: Portada + Título + Artista (Texto más grande) */}
          <div
            onClick={togglePlay}
            className="flex items-center gap-3 min-w-0 cursor-pointer flex-1 mr-2"
          >
            {/* Cuadro de portada con carátula IA o clásica */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-lg overflow-hidden shrink-0 shadow-lg border border-white/20 bg-[#881337]">
              {renderCover(currentSong?.cover_url || currentSong?.cover || 'cover_23', 'w-full h-full object-cover')}
            </div>

            {/* Título y Artistas más grandes */}
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-black text-white truncate leading-tight">
                {currentSong ? (currentSong.title || currentSong.titulo) : '23'}
              </p>
              <p className="text-xs sm:text-sm text-red-200/90 truncate font-semibold mt-0.5">
                {currentSong ? (currentSong.artist || currentSong.artista) : 'Mike WiLL Made-It, Miley Cyrus'}
              </p>
            </div>
          </div>

          {/* Derecha: Controles completos (Agregar a carpeta, Cambiar música, Anterior, Play, Siguiente) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 1. Botón: Agregar a cualquier carpeta desde el reproductor */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (currentSong) {
                  setSongToAddToFolder(currentSong);
                  setShowAddToFolderModal(true);
                }
              }}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-emerald-400 hover:text-white transition active:scale-90 flex items-center gap-1 shadow-sm"
              title="Agregar canción actual a cualquier carpeta"
            >
              <FolderPlus className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </button>

            {/* 2. Botón: Cambiar música directamente desde aquí */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowChangeSongModal(true);
              }}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-yellow-300 hover:text-white transition active:scale-90 shadow-sm"
              title="Cambiar música / Explorar canciones"
            >
              <ListMusic className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
            </button>

            {/* 3. Botón: Canción Anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                reproducirAnterior();
              }}
              className="p-1.5 text-white/80 hover:text-white transition active:scale-90"
              title="Pista anterior"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* 4. Botón: PLAY / PAUSA (Donde se da Play - botón redondo grande y visible) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-xl"
              title={isPlaying ? 'Pausar' : 'Reproducir'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* 5. Botón: Canción Siguiente */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                reproducirSiguiente();
              }}
              className="p-1.5 text-white/80 hover:text-white transition active:scale-90"
              title="Siguiente pista"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          BARRA DE NAVEGACIÓN INFERIOR (MÁS GRANDE Y CÓMODA)
          Inicio, Buscar, Tu biblioteca, Crear
          ========================================== */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-neutral-900 px-4 flex items-center justify-around z-40 select-none">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => {
            setActiveTab('inicio');
            setSelectedFolder(null);
          }}
          className={`flex flex-col items-center justify-center gap-1 transition py-1 ${
            activeTab === 'inicio' && !selectedFolder ? 'text-[#1ED760] font-black' : 'text-gray-400 hover:text-gray-200 font-semibold'
          }`}
        >
          <Home className={`w-6 h-6 ${activeTab === 'inicio' && !selectedFolder ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-xs">Inicio</span>
        </button>

        {/* Tab 2: Buscar */}
        <button
          onClick={() => setActiveTab('buscar')}
          className={`flex flex-col items-center justify-center gap-1 transition py-1 ${
            activeTab === 'buscar' ? 'text-[#1ED760] font-black' : 'text-gray-400 hover:text-gray-200 font-semibold'
          }`}
        >
          <Search className={`w-6 h-6 ${activeTab === 'buscar' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-xs">Buscar</span>
        </button>

        {/* Tab 3: Tu biblioteca */}
        <button
          onClick={() => setActiveTab('biblioteca')}
          className={`flex flex-col items-center justify-center gap-1 transition py-1 ${
            activeTab === 'biblioteca' ? 'text-[#1ED760] font-black' : 'text-gray-400 hover:text-gray-200 font-semibold'
          }`}
        >
          <Library className={`w-6 h-6 ${activeTab === 'biblioteca' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-xs">Tu biblioteca</span>
        </button>

        {/* Tab 4: Crear (+ Subir Canción con IA) */}
        <button
          onClick={() => {
            setShowUploadModal(true);
          }}
          className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-pink-400 transition font-semibold py-1"
        >
          <Plus className="w-6 h-6 stroke-[2.2] text-pink-400" />
          <span className="text-xs text-pink-300 font-bold">Subir MP3</span>
        </button>
      </footer>

      {/* ==========================================
          MODAL: SUBIR CANCIÓN CON DEEPSEEK IA
          ========================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                if (!isUploading) setShowUploadModal(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-pink-600/30">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Subir MP3 con DeepSeek IA</h3>
                <p className="text-xs text-pink-400 font-semibold">
                  Nombre inteligente, artista y portada automática
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (selectedFile) {
                  subirCancion(selectedFile);
                }
              }}
              className="space-y-4 text-sm"
            >
              {/* Selector de Archivo MP3 */}
              <div>
                <label className="block text-xs font-bold text-gray-200 mb-1.5 uppercase tracking-wide">
                  Selecciona archivo MP3 <span className="text-pink-500">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#383838] hover:border-pink-500 rounded-xl p-4 text-center cursor-pointer transition bg-[#141414] active:scale-[0.99]"
                >
                  <Music className="w-9 h-9 text-pink-400 mx-auto mb-2" />
                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-bold text-emerald-400 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 font-medium">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Clic para cambiar
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-200 font-semibold">Toca aquí para elegir tu archivo MP3</p>
                      <p className="text-xs text-gray-400 mt-1">
                        La IA DeepSeek detectará automáticamente el título, artista y diseñará la foto.
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/mpeg,audio/mp3,.mp3,audio/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setSelectedFile(f);
                      // 1. Extracción instantánea de ID3 y parsing heurístico previo
                      const id3 = await extractAudioMetadataFromFile(f);
                      const fast = parseSmartAudioName(f.name);
                      const initialTitle = id3.title || fast.titulo;
                      const initialArtist = id3.artist || fast.artista;
                      setCustomTitle(initialTitle);
                      setCustomArtist(initialArtist);
                      if (fast.sugerenciaCarpeta) setTargetFolderId(fast.sugerenciaCarpeta);

                      // 2. Análisis y nombramiento inteligente con IA (DeepSeek & Gemini)
                      await analizarAudioConIA(f, id3.title || fast.titulo, id3.artist || fast.artista);
                    }
                  }}
                />
              </div>

              {/* Indicador de Estado de la IA DeepSeek / Gemini */}
              {isAiAnalyzing && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-indigo-950/70 border border-pink-500/50 flex items-center gap-3 text-xs text-pink-200 animate-pulse shadow-lg">
                  <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">🤖 IA identificando canción y artista...</p>
                    <p className="text-[11px] text-pink-200/90 font-medium">Extrayendo el nombre exacto, artista musical y diseñando portada 4K</p>
                  </div>
                </div>
              )}

              {aiIdentifiedInfo && !isAiAnalyzing && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200 shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">{aiIdentifiedInfo.fuenteIA || 'IA Musical'}</p>
                      <p className="text-sm font-black text-white">
                        {aiIdentifiedInfo.artista} <span className="text-gray-400 font-normal">—</span> {aiIdentifiedInfo.titulo}
                      </p>
                      <p className="text-[11px] text-emerald-300 font-medium">{aiIdentifiedInfo.genero}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-[11px] font-black">
                    Identificado
                  </span>
                </div>
              )}

              {/* Selector e Input oculto de Foto de Portada */}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setCoverFile(f);
                    const localPreview = URL.createObjectURL(f);
                    setCoverPreviewUrl(localPreview);
                  }
                }}
              />

              {/* Vista Previa de la Portada / Foto con IA o Subida */}
              <div className="bg-[#141414] border border-white/10 rounded-xl p-3 flex items-center gap-3.5">
                <div
                  onClick={() => coverInputRef.current?.click()}
                  className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-white/10 relative shadow-md cursor-pointer group"
                  title="Toca para elegir o cambiar foto de portada"
                >
                  {coverPreviewUrl || customCoverUrl ? (
                    <img
                      src={coverPreviewUrl || customCoverUrl}
                      alt="Portada"
                      className="w-full h-full object-cover group-hover:opacity-80 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-pink-700 to-indigo-700 text-white font-bold text-[10px] text-center p-1">
                      <ImageIcon className="w-4 h-4 mb-0.5" />
                      FOTO
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">Foto de portada (cover_url)</p>
                    {coverFile ? (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        ✓ Foto propia
                      </span>
                    ) : customCoverUrl ? (
                      <span className="text-[10px] text-pink-400 font-bold bg-pink-500/10 px-1.5 py-0.5 rounded">
                        ✨ Foto IA
                      </span>
                    ) : null}
                  </div>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                    {coverFile
                      ? coverFile.name
                      : customCoverUrl
                      ? 'Diseñada para el artista y canción'
                      : 'Sube tu imagen o la IA la generará al instante'}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="px-2.5 py-1 text-[11px] font-bold bg-pink-600/25 hover:bg-pink-600/40 text-pink-300 rounded-md transition flex items-center gap-1 active:scale-95"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Subir foto propia</span>
                    </button>
                    <button
                      type="button"
                      onClick={regenerarFotoIA}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white/10 hover:bg-white/20 text-gray-300 rounded-md transition flex items-center gap-1 active:scale-95"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Foto con IA</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Título y Artista */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-200">
                      Título de la canción <span className="text-pink-500">*</span>
                    </label>
                    {customTitle && <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">✨ Asignado por IA</span>}
                  </div>
                  <input
                    type="text"
                    placeholder="Ej: El Tóxico"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#333333] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-200">
                      Artista / Grupo <span className="text-pink-500">*</span>
                    </label>
                    {customArtist && customArtist.toLowerCase() !== 'desconocido' && (
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">✨ Reconocido</span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Ej: Grupo Firme"
                    value={customArtist}
                    onChange={(e) => setCustomArtist(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141414] border border-[#333333] focus:border-pink-500 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              {/* Selector de Carpeta Destino */}
              <div>
                <label className="block text-xs font-bold text-gray-200 mb-1">
                  Guardar en Carpeta:
                </label>
                <select
                  value={targetFolderId}
                  onChange={(e) => setTargetFolderId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#141414] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                >
                  {folders.map((f) => (
                    <option key={f.id} value={f.id} className="bg-[#1A1A1A] text-white">
                      📁 {f.titulo} ({f.badge || 'Carpeta'})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-400 mt-1">
                  La canción se agregará a esta carpeta y a tu catálogo automáticamente.
                </p>
              </div>

              {isUploading && (
                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-2.5 text-xs text-emerald-200">
                  <div className="w-4 h-4 border-2 border-[#1ED760] border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="font-semibold">{uploadStatus || 'Subiendo archivo...'}</span>
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 text-xs sm:text-sm font-semibold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="flex-1 py-2.5 text-xs sm:text-sm font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <span>Guardar y Reproducir</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: INICIAR SESIÓN / REGISTRO ADMIN
          ========================================== */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                {isSignUpMode ? <UserPlus className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {isSignUpMode ? 'Registrar Administrador' : 'Acceso Administrador'}
                </h3>
                <p className="text-xs text-gray-400">Autenticación con Supabase Auth</p>
              </div>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-500/40 rounded-xl flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <span>{authError}</span>
                  {authError.includes('Invalid login credentials') && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUpMode(true);
                        setAuthError(null);
                      }}
                      className="block mt-1 text-blue-400 hover:underline font-semibold"
                    >
                      ¿El usuario no existe? Crear cuenta aquí.
                    </button>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-200 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>{isSignUpMode ? 'Registrando...' : 'Verificando...'}</span>
                    </>
                  ) : (
                    <span>{isSignUpMode ? 'Crear Cuenta' : 'Iniciar Sesión'}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSignUpMode(!isSignUpMode);
                    setAuthError(null);
                  }}
                  className="text-center text-[11px] text-gray-300 hover:text-blue-400 transition font-medium"
                >
                  {isSignUpMode
                    ? '¿Ya tienes cuenta? Iniciar sesión'
                    : '¿Primera vez? Registrar cuenta en Supabase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CENTRO DE PUBLICACIÓN Y DESPLIEGUE EN TU PROPIA URL
          ========================================== */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-3xl w-full max-w-2xl p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDeployModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-xl bg-[#2C2C2E] transition active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 shrink-0">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="min-w-0 pr-6">
                <h3 className="text-lg sm:text-xl font-black text-white truncate">
                  Publicar FINANCIERA AARON
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  Tu propia URL pública independiente de Google AI Studio para Android
                </p>
              </div>
            </div>

            {/* Pestañas de la Guía */}
            <div className="flex items-center gap-1.5 p-1 bg-[#141416] rounded-2xl border border-white/5 mb-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setDeployTab('vercel')}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  deployTab === 'vercel'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>1. Vercel (Recomendado)</span>
              </button>
              <button
                onClick={() => setDeployTab('android')}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  deployTab === 'android'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
                <span>2. Instalar en Android</span>
              </button>
              <button
                onClick={() => setDeployTab('netlify')}
                className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  deployTab === 'netlify'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>3. Netlify Drop</span>
              </button>
            </div>

            {/* Garantía de Datos */}
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-emerald-300">¡Tu trabajo y canciones NO se perderán!</p>
                <p className="text-[11px] text-emerald-200/80 mt-0.5 leading-relaxed">
                  Tu base de datos y audios están alojados en la nube de Supabase (<code className="font-mono text-emerald-300">djqjagjaywphhaoonbdq.supabase.co</code>). Al desplegar en tu propia URL, la app se conectará automáticamente a tus mismas canciones, carpetas y usuarios.
                </p>
              </div>
            </div>

            {/* Contenido Pestaña 1: VERCEL */}
            {deployTab === 'vercel' && (
              <div className="space-y-3.5 text-xs text-gray-200 animate-fade-in">
                <div className="p-4 rounded-2xl bg-[#242426] border border-[#38383A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Despliegue automático con Vercel (Gratis y Permanente)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                      2 Minutos
                    </span>
                  </div>

                  <p className="text-gray-300 text-[11px]">
                    Vercel te proporcionará una URL pública HTTPS gratuita (como <code className="text-blue-300 font-mono">https://financiera-aaron.vercel.app</code>) y actualizará la app cada vez que hagas cambios.
                  </p>

                  <div className="space-y-2 text-[11px] text-gray-300 pl-1">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Tu repositorio de GitHub:</p>
                        <div className="flex items-center justify-between gap-2 p-2 mt-1 rounded-xl bg-[#18181A] border border-white/10 font-mono text-blue-300 text-[11px]">
                          <span className="truncate">https://github.com/mejiamejiaaaron-eng/Musicaspotyy</span>
                          <button
                            onClick={() => copyText('https://github.com/mejiamejiaaaron-eng/Musicaspotyy', 'Enlace de GitHub')}
                            className="px-2 py-1 bg-[#282828] hover:bg-[#333333] text-white rounded-lg transition shrink-0 flex items-center gap-1 font-sans"
                          >
                            {copiedDeployText === 'Enlace de GitHub' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copiar</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Entra a Vercel:</p>
                        <p className="mt-0.5">Ingresa a <strong className="text-white">vercel.com</strong> e inicia sesión con tu cuenta de GitHub.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Importa el proyecto:</p>
                        <p className="mt-0.5">Haz clic en <strong className="text-white">&quot;Add New...&quot; &gt; &quot;Project&quot;</strong> y selecciona <strong className="text-white">Musicaspoty</strong>.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Configuración automática de Vite:</p>
                        <p className="mt-0.5">Vercel detecta automáticamente: Framework: <strong className="text-white">Vite</strong> | Build Command: <code className="text-blue-300 font-mono">npm run build</code> | Output: <code className="text-blue-300 font-mono">dist</code>.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex items-center justify-center shrink-0 text-[10px]">5</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Presiona &quot;Deploy&quot;:</p>
                        <p className="mt-0.5">En 40 segundos tendrás tu propia URL pública con certificado HTTPS para abrir en tu celular Android.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido Pestaña 2: ANDROID PWA */}
            {deployTab === 'android' && (
              <div className="space-y-3.5 text-xs text-gray-200 animate-fade-in">
                <div className="p-4 rounded-2xl bg-[#242426] border border-[#38383A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Cómo instalar FINANCIERA AARON en Android</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      Icono Propio
                    </span>
                  </div>

                  <p className="text-gray-300 text-[11px]">
                    No necesitas instalar Google AI Studio en tu celular. Tu app web cuenta con Service Worker y Web App Manifest para comportarse como una aplicación nativa de Android:
                  </p>

                  <div className="space-y-2.5 text-[11px] text-gray-300 pl-1">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div>
                        <p className="font-semibold text-white">Abre tu URL pública en Chrome:</p>
                        <p className="mt-0.5">En tu celular Android, abre el navegador <strong className="text-white">Google Chrome</strong> y escribe tu URL (ej. <code className="text-emerald-300 font-mono">https://tu-app.vercel.app</code>).</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div>
                        <p className="font-semibold text-white">Toca el banner o menú (⋮):</p>
                        <p className="mt-0.5">Verás un aviso inferior que dice <strong className="text-emerald-400">&quot;Agregar FINANCIERA AARON a la pantalla principal&quot;</strong>. Si no aparece, toca los <strong className="text-white">tres puntos verticales (⋮)</strong> arriba a la derecha en Chrome.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div>
                        <p className="font-semibold text-white">Toca &quot;Instalar aplicación&quot;:</p>
                        <p className="mt-0.5">Selecciona <strong className="text-emerald-400">&quot;Instalar aplicación&quot;</strong> o <strong className="text-emerald-400">&quot;Agregar a la pantalla principal&quot;</strong> y confirma presionando <strong className="text-white">&quot;Instalar&quot;</strong>.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                      <div>
                        <p className="font-semibold text-white">¡Listo! Acceso directo con su propio icono:</p>
                        <p className="mt-0.5 text-emerald-300 font-medium">Se creará el icono de FINANCIERA AARON en la pantalla de inicio de tu celular. Al tocarlo, se abrirá a pantalla completa sin barra de direcciones, sin Google AI Studio y con reproducción de fondo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenido Pestaña 3: NETLIFY DROP */}
            {deployTab === 'netlify' && (
              <div className="space-y-3.5 text-xs text-gray-200 animate-fade-in">
                <div className="p-4 rounded-2xl bg-[#242426] border border-[#38383A] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-teal-400" />
                      <span>Netlify Drop (Arrastrar y Soltar sin código)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold">
                      1 Minuto
                    </span>
                  </div>

                  <p className="text-gray-300 text-[11px]">
                    Si prefieres no usar GitHub, puedes arrastrar la carpeta compilada <strong className="text-white">dist</strong> directamente:
                  </p>

                  <div className="space-y-2 text-[11px] text-gray-300 pl-1">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Compilación lista:</p>
                        <p className="mt-0.5">La carpeta <code className="text-teal-300 font-mono">dist/</code> ya contiene el HTML, manifest.json, sw.js, iconos y estilos.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Abre Netlify Drop:</p>
                        <div className="flex items-center justify-between gap-2 p-2 mt-1 rounded-xl bg-[#18181A] border border-white/10 font-mono text-teal-300 text-[11px]">
                          <span>https://app.netlify.com/drop</span>
                          <button
                            onClick={() => copyText('https://app.netlify.com/drop', 'Enlace Netlify Drop')}
                            className="px-2 py-1 bg-[#282828] hover:bg-[#333333] text-white rounded-lg transition shrink-0 flex items-center gap-1 font-sans"
                          >
                            {copiedDeployText === 'Enlace Netlify Drop' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copiar</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div className="flex-1">
                        <p className="font-semibold text-white">Arrastra la carpeta dist:</p>
                        <p className="mt-0.5">Suelta la carpeta en la pantalla de Netlify y obtendrás tu URL pública al instante.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10 mt-5">
              <button
                onClick={() => setDeployTab(deployTab === 'android' ? 'vercel' : 'android')}
                className="py-2.5 px-4 text-xs font-bold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition flex items-center gap-1.5 active:scale-95"
              >
                {deployTab === 'android' ? <Globe className="w-3.5 h-3.5 text-blue-400" /> : <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{deployTab === 'android' ? 'Ver guía de Vercel' : 'Ver pasos de instalación Android'}</span>
              </button>
              <button
                onClick={() => setShowDeployModal(false)}
                className="py-2.5 px-6 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow-lg transition active:scale-95"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CONFIRMACIÓN PARA ELIMINAR CANCIÓN
          ========================================== */}
      {songToDelete && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-red-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setSongToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-xl bg-[#2C2C2E] transition active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 pr-6">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  ¿Eliminar canción?
                </h3>
                <p className="text-xs text-red-400 font-semibold">
                  Esta acción es permanente
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#242426] border border-[#38383A] mb-4 flex items-center gap-3">
              {renderCover(songToDelete.cover_url || songToDelete.cover, 'w-12 h-12')}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">{songToDelete.title || songToDelete.titulo}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{songToDelete.artist || songToDelete.artista}</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-5 leading-relaxed">
              La canción se quitará de todas tus carpetas (buchonass, perreale, etc.) y se eliminará de la base de datos de Supabase.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSongToDelete(null)}
                className="flex-1 py-2.5 text-xs sm:text-sm font-bold bg-[#282828] hover:bg-[#333333] text-gray-300 rounded-xl transition active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminarCancion}
                className="flex-1 py-2.5 text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sí, eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CONFIRMACIÓN PARA ELIMINAR CARPETA
          ========================================== */}
      {folderToDelete && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-red-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setFolderToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-xl bg-[#2C2C2E] transition active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 pr-6">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  ¿Eliminar carpeta completa?
                </h3>
                <p className="text-xs text-red-400 font-semibold">
                  {folderToDelete.titulo}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-5 leading-relaxed">
              ¿Estás seguro de que deseas eliminar la carpeta <strong className="text-white">&quot;{folderToDelete.titulo}&quot;</strong>? Las canciones dentro seguirán existiendo en tu biblioteca principal.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setFolderToDelete(null)}
                className="flex-1 py-2.5 text-xs sm:text-sm font-bold bg-[#282828] hover:bg-[#333333] text-gray-300 rounded-xl transition active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminarCarpeta}
                className="flex-1 py-2.5 text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/30 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sí, eliminar carpeta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: AGREGAR CANCIÓN A CUALQUIER CARPETA (DESDE REPRODUCTOR)
          ========================================== */}
      {showAddToFolderModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-md p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddToFolderModal(false);
                setSongToAddToFolder(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#2C2C2E] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FolderPlus className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  Agregar a Carpeta
                </h3>
                <p className="text-xs text-gray-400 truncate">
                  {songToAddToFolder?.titulo || currentSong?.titulo || 'Canción'} • {songToAddToFolder?.artista || currentSong?.artista}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 font-medium mb-3">
              Selecciona a cuál de tus carpetas quieres añadir este audio:
            </p>

            {/* Lista de Carpetas Disponibles */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {folders.map((f) => {
                const song = songToAddToFolder || currentSong;
                const yaEsta = song
                  ? f.canciones.some(
                      (c) =>
                        String(c.id) === String(song.id) ||
                        (c.titulo.toLowerCase() === song.titulo.toLowerCase() &&
                          c.artista.toLowerCase() === song.artista.toLowerCase())
                    )
                  : false;

                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      if (song) {
                        if (yaEsta) {
                          quitarCancionDeCarpeta(f.id, song.id);
                        } else {
                          agregarCancionACarpeta(f.id, song);
                        }
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition border ${
                      yaEsta
                        ? 'bg-emerald-950/40 border-emerald-500/40 hover:bg-emerald-900/40'
                        : 'bg-[#242426] border-[#38383A] hover:bg-[#2C2C2E]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderCover(f.coverKey, 'w-10 h-10')}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {f.titulo}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {f.canciones.length} audios • {f.badge || 'Carpeta'}
                        </p>
                      </div>
                    </div>

                    <div>
                      {yaEsta ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Incluida</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white text-xs font-bold flex items-center gap-1 transition">
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Añadir</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  setShowAddToFolderModal(false);
                  setSongToAddToFolder(null);
                }}
                className="w-full py-2.5 text-xs sm:text-sm font-bold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: CAMBIAR MÚSICA DIRECTAMENTE DESDE EL REPRODUCTOR
          ========================================== */}
      {showChangeSongModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[88vh] flex flex-col">
            <button
              onClick={() => setShowChangeSongModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#2C2C2E] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center">
                <ListMusic className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Cambiar Canción
                </h3>
                <p className="text-xs text-yellow-300 font-semibold">
                  Toca cualquier audio para reproducirlo al instante
                </p>
              </div>
            </div>

            {/* Buscador Rápido de Pistas */}
            <div className="relative mb-3 shrink-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por canción o artista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#141414] border border-[#333333] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 font-medium"
              />
            </div>

            {/* Lista de Canciones para Cambiar */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredSongs.map((cancion) => {
                const esActual = currentSong?.id === cancion.id;
                return (
                  <div
                    key={cancion.id}
                    onClick={() => {
                      seleccionarCancion(cancion);
                      setShowChangeSongModal(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                      esActual
                        ? 'bg-yellow-500/20 border border-yellow-400/50 text-white'
                        : 'bg-[#242426] hover:bg-[#2e2e30] text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderCover(cancion.cover_url || cancion.cover, 'w-11 h-11')}
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${esActual ? 'text-yellow-300' : 'text-white'}`}>
                          {cancion.title || cancion.titulo}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {cancion.artist || cancion.artista}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {esActual && isPlaying ? (
                        <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center">
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 shrink-0 flex justify-end">
              <button
                onClick={() => setShowChangeSongModal(false)}
                className="w-full py-2.5 text-xs sm:text-sm font-bold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: AGREGAR MÚSICA DE LA BIBLIOTECA A LA CARPETA ACTUAL
          ========================================== */}
      {showAddMusicToCurrentFolderModal && selectedFolder && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[88vh] flex flex-col">
            <button
              onClick={() => setShowAddMusicToCurrentFolderModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#2C2C2E] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4 shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <FolderPlus className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  Agregar a: {selectedFolder.titulo}
                </h3>
                <p className="text-xs text-blue-400 font-semibold">
                  Selecciona canciones de tu biblioteca para añadirlas a esta carpeta
                </p>
              </div>
            </div>

            {/* Lista de Canciones para Agregar a la Carpeta */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {canciones.map((cancion) => {
                const yaEsta = selectedFolder.canciones.some(
                  (c) =>
                    String(c.id) === String(cancion.id) ||
                    (c.titulo.toLowerCase() === cancion.titulo.toLowerCase() &&
                      c.artista.toLowerCase() === cancion.artista.toLowerCase())
                );

                return (
                  <div
                    key={cancion.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                      yaEsta
                        ? 'bg-emerald-950/30 border-emerald-500/30'
                        : 'bg-[#242426] border-[#38383A] hover:bg-[#2e2e30]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {renderCover(cancion.cover_url || cancion.cover, 'w-10 h-10')}
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {cancion.title || cancion.titulo}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {cancion.artist || cancion.artista}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {yaEsta ? (
                        <button
                          onClick={() => quitarCancionDeCarpeta(selectedFolder.id, cancion.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900/60 text-xs font-semibold flex items-center gap-1 transition"
                          title="Quitar de esta carpeta"
                        >
                          <MinusCircle className="w-3.5 h-3.5" />
                          <span>Quitar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => agregarCancionACarpeta(selectedFolder.id, cancion)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow transition"
                          title="Agregar a esta carpeta"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Agregar</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 shrink-0 flex justify-end">
              <button
                onClick={() => setShowAddMusicToCurrentFolderModal(false)}
                className="w-full py-2.5 text-xs sm:text-sm font-bold bg-[#282828] hover:bg-[#333333] text-gray-200 rounded-xl transition"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MODAL: GUÍA DE CONFIGURACIÓN RLS SUPABASE
          ========================================== */}
      {showRlsModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] border border-[#383838] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRlsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Configurar Tabla 'songs' y Storage en Supabase
                </h3>
                <p className="text-xs text-emerald-400">
                  Crea la tabla songs con persistencia (Título, Artista, Portada y Audio)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <p>
                Para guardar y recuperar tus canciones de forma permanente con su título, artista y foto de portada, ve al <strong className="text-white">SQL Editor</strong> de tu panel de Supabase, pega y ejecuta este script:
              </p>

              <div className="relative">
                <pre className="p-3 bg-[#121212] border border-[#333333] rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
                  {rlsSql}
                </pre>
                <button
                  onClick={copyRlsSql}
                  className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#282828] hover:bg-[#383838] text-white text-[11px] font-semibold transition shadow"
                >
                  {sqlCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar SQL</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setShowRlsModal(false)}
                className="w-full py-2.5 text-xs font-bold bg-[#1ED760] hover:bg-[#1db954] text-black rounded-xl shadow transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TOAST FEEDBACK
          ========================================== */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold ${
            toast.type === 'success'
              ? 'bg-[#181818] border-[#1ED760] text-white'
              : 'bg-[#181818] border-red-500 text-red-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#1ED760] shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}