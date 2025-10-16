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
                <div className="social-footer-group">
                    <p>Biz sosial şəbəkələrdən izləyin:</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/absheroncareer/" target="_blank">
                            <img src={fbIMG} class=" No-Select" />
                        </a>
                        <a href="https://www.linkedin.com/company/103794108/" target="_blank">
                            <img src={inIMG} class=" No-Select" />
                        </a>
                        <a href="https://www.instagram.com/absheroncareer/" target="_blank">
                            <img src={igIMG} class=" No-Select" />
                        </a>
                        <a href="" target="_blank">
                            <img src={xIMG} class=" No-Select" />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
