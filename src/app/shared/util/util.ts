export function getPhoneMask(e: any, tel: boolean, id: string): any[] {
    const phone = document.getElementById(id);
    const maskPlace = phone.getAttribute('placeholder');

    if (e.dialCode === '55') {
        if (tel) {
            return ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        }
    }

    const arrayMask: any[] = new Array(maskPlace.length);

    for (let i = 0; i < maskPlace.length; i++) {
        if (maskPlace.charAt(i) === ' ' || maskPlace.charAt(i) === '-' || maskPlace.charAt(i) === ')' || maskPlace.charAt(i) === '(') {
            arrayMask[i] = maskPlace.charAt(i);
        } else {
            arrayMask[i] = /\d/;
        }
    }
    return arrayMask;
}
