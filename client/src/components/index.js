export function mayusculas(string){
    let first_cha = string.charAt(0);
    first_cha = first_cha.toUpperCase();
    return first_cha.concat(string.slice(1));
}