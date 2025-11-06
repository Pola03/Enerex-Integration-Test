export const ensureIntRange=(value, min, max) => {
   // 1. Limpieza estricta: Elimina CUALQUIER COSA que no sea un dígito.
    // Esto previene puntos decimales, letras, y cualquier símbolo.
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    if(sanitizedValue === '')
        return sanitizedValue;
    const numericValue = parseInt(sanitizedValue, 10); 
    if (numericValue>max){
        return String(max);
    }
    if (numericValue<min){
        return String(min);
    }
    return sanitizedValue;
}