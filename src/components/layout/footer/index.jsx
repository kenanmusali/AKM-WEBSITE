import React from 'react'
import logoIMG from '../../../assets/favicon/logoALMaze.svg'
import fbIMG from '../../../assets/svg/fb.social.svg'
import inIMG from '../../../assets/svg/in.social.svg'
import igIMG from '../../../assets/svg/ig.social.svg'
import xIMG from '../../../assets/svg/x.social.svg'

const Footer = () => {
    return (
        <div className='Footer-Group'>
            <div className="Footer Center-Objects ">
                <img src={logoIMG} class="Logo-Marks No-Select" />
                <div className="Main-Button">
                    <a className='Link-Fotter' href="https://www.linkedin.com/company/103794108/" target="_blank">
                        <p className='Social-Text'>BİZ SOSİAL ŞƏBƏKƏDƏN İZLƏYİN</p>
                        {/* <div className="social-icons">
                            <img src={inIMG} class=" No-Select" />
                            <a href="https://www.facebook.com/absheroncareer/" target="_blank">
                            <img src={fbIMG} class=" No-Select" />
                            </a>
                            <a href="https://www.instagram.com/absheroncareer/" target="_blank">
                            <img src={igIMG} class=" No-Select" />
                            </a>
                            <a href="" target="_blank">
                            <img src={xIMG} class=" No-Select" />
                            </a>

                        </div> */}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
