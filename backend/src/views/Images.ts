import Image from '../models/Image';

export default {
    
    render(image: Image) {
        return {
            id: image.id,
            // url: `http://192.168.1.3:3333/uploads/${image.path}`
            url: `http://10.0.0.103:3333/uploads/${image.path}`
        }
    },

    renderMany(image: Image[]) {
        return image.map(image => this.render(image));
    }

}