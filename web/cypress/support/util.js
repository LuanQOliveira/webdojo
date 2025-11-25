// adicionar função nativa para formatar data como DD/MM/AAAA
export function getTodayFormatteDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}` ;
}