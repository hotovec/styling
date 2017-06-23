/**
 * Created by hotovec on 20.2.2017.
 */

export class Core {

    constructor() {
        console.log('CoreInit:Done');
        this.InitSelfClose();
    }

    InitSelfClose() {
        $('[self-close]').each((index, elem) => {
            let el = $(elem);

            el.on('click', (ev) => {
                console.log("el");
                el.hide();
            })
        });
    }

}
