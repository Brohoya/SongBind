// export default function kebabCase(str: string): string {
//   return str
//     .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
//     .join('-')
//     .toLowerCase();  
// };

export default function kebabCase(str: string): string {
   return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_!@#\$%\^\&*\)\(+=._-]+/g, '-')
    .toLowerCase(); 
} 