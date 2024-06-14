declare module '*.css';

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    MODE: 'development' | 'production';
    STORAGE_KEY: string;
  }
}
