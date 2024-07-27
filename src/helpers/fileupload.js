
export const fileUpload = async (file) => {
    if(!file) throw new Error('Ningun archivo a subir')
   
    const cloudURL = 'https://api.cloudinary.com/v1_1/thinkify/upload'
    const formData = new FormData();
    formData.append('upload_preset','thinkify-profile')
    formData.append('file', file)
    
    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        
        })

        console.log(resp)
        if (!resp.ok) throw new Error('No se pudo subir imagen')
        
        const cloudResp = resp.json()
        console.log(cloudResp)

        return cloudResp
            
    } catch (error) {
        console.log(error)
       
    }
}