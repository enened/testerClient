function Reading({reading}){

    const _arrayBufferToBase64 = ( buffer ) => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    return(
        <>
            {reading.map((val, index)=>{
                return(
                    <>
                        <img className='questionImages' src = {`data:image/${val.reading.contentType};base64,${_arrayBufferToBase64(val.reading.data)}`}/>
                        <br/>
                    </>
                )
            })}
        </>
    )
}

export default Reading;