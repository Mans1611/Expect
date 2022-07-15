

const mailMessage = (msg='verification',link="#")=> {
    const containerStyle = `
        width: 100%;
        height: fit-content;
        background-color:#93002C;
    `
    const header = "height: 60px;background-color: #ffa600;color: #fff;font-size: 40px;text-align: center;font-weight: 600";
    const bodyTitle = "font-size: 30px;text-align: center;font-weight: 500";
    const footer = "background-color: #ffa600;padding:10px;color:#fff;"

    

    return(`
    <div style="${containerStyle}">
        <div style="${header}">Expect</div>
        <div>
            <h1 style="${bodyTitle}">
            this is an email verification</h1>
            <p>${msg}</p>
            <a href=${link}>${msg}</a>
        </div>
        <footer style="${footer}">
            Expect leadies and gentelmen
        </footer>
    </div>
    `
    )
}
export default mailMessage;
