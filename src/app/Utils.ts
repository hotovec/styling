export class Utils {

    static addFeatureClass(className: string) {
        if (className) {
            $('body').addClass('f-' + className);
        }
    }
}
