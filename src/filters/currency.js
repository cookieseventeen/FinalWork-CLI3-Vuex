export default function (num) {
    const n = Number(num);
    if (isNaN(n)) {
        return '$0';
    }
    return `$${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
  