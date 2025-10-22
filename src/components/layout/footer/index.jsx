import React from 'react'
import logo1IMG from '/public/images/logo1.svg'
import logo2IMG from '/public/images/logo2.svg'
import logo3IMG from '/public/images/logo3.svg'
import logo4IMG from '/public/images/logo4.svg'
import logo5IMG from '/public/images/logo5.svg'

import inIMG from '../../../assets/svg/in.social.svg'
// import fbIMG from '../../../assets/svg/fb.social.svg'
// import igIMG from '../../../assets/svg/ig.social.svg'
// import xIMG from '../../../assets/svg/x.social.svg'
const Footer = () => {
    return (
        <div className='Footer-Group'>
            <div className="Footer Center-Objects ">
                <div className="Logo-Stack-Footer">
                    <img src={logo1IMG} class="Logo-Marks No-Select" />
                    <img src={logo2IMG} class="Logo-Marks No-Select" />
                    <img src={logo3IMG} class="Logo-Marks No-Select" />
                    <img src={logo4IMG} class="Logo-Marks No-Select" />
                    <img src={logo5IMG} class="Logo-Marks No-Select" />
                </div>
                <div className="social-footer-group">
                    <p>Bizi sosial şəbəkədən izləyin:</p>
                    <div className="social-icons">
                        {/* <a href="https://www.facebook.com/absheroncareer/" target="_blank">
                            <img src={fbIMG} class=" No-Select" />
                        </a> */}
                        <a href="https://www.linkedin.com/company/103794108/" target="_blank">
                            <img src={inIMG} class=" No-Select" />
                        </a>
                        {/* <a href="https://www.instagram.com/absheroncareer/" target="_blank">
                            <img src={igIMG} class=" No-Select" />
                        </a> */}
                        {/* <a href="" target="_blank">
                            <img src={xIMG} class=" No-Select" />
                        </a> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
