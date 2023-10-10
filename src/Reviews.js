import { useMediaQuery } from '@mui/material';
import './reviews.css';

const desktopStyles = {
    left: '50%',
    transform: 'translateX(-50%)',
}
export default function Reviews() {
    const isMobile = useMediaQuery('(max-width:870px)');
    return (
        <div className="reviews">
            <div className="review" style={isMobile?{flexDirection:"row"}:{flexDirection:'row',...desktopStyles}}>
                <div className="picture">
                    <img src="https://media.licdn.com/dms/image/D5603AQEYKuDadNKH4w/profile-displayphoto-shrink_800_800/0/1687388346121?e=1702512000&v=beta&t=NAtX1tVuvCCtReeCJJRgjGGIyJnRnepCmLkx_XkOb04" alt='Gustavo Vasquez, business student at Chapman University'/>
                    <div className="caption"><span style={{fontWeight: 'bold',}}>Gustavo Vasquez</span><span style={{fontStyle: 'italic',}}><br/>Chapman University '24</span></div>
                </div>
                <div className='wrapper'>
                    <div className='content'>
                        <div className='quotation-top' style={{right: 'calc(100% - 110px)'}}>"</div>
                        <p style={{marginLeft: '60px',}}>Daus not only provides comprehensive lesson plans, but also enforces student learning through repetition and guided practice to ensure they can execute the problems independently. <br/><br/> He is also able to teach a wide array of math topics in a manner that is patient yet motivating at the same time. In allowing students to learn at their own pace, Daus fosters an environment that anyone can thrive in.</p>
                        <div className='quotation-bot' style={{right: '-10px'}}>"</div>
                    </div>
                </div>
            </div>
            <div className="review" style={isMobile?{flexDirection:"row"}:{flexDirection:'row-reverse',...desktopStyles}}>
                <div className="picture">
                    <img src="https://github.com/daus-s/portfolio/blob/main/public/Mirkhani.jpeg?raw=true" alt='Sarah Mirkhani, dental student at Midwestern University'/>
                    <div className="caption"><span style={{fontWeight: 'bold',}}>Sarah Mirkhani</span><span style={{fontStyle: 'italic',}}><br/>Chapman University '23,<br/>Midwestern University, College of Dental Medicine</span></div>
                </div>
                <div className='wrapper'>
                    <div className='content'>
                        <div className='quotation-top' style={isMobile?{right: 'calc(100% - 110px)'}:{}}>"</div>
                        <p style={isMobile?{marginLeft: '60px'}:{marginRight: '60px'}}>Tutoring with Daus has been a great experience. I have not only seen an improvement in my grades, but the understanding of the material as well. Despite Daus’s extensive expertise he has the capability to approach subjects with simplified and easy to understand methods that do not sacrifice content. <br/><br/> Academic tutoring with Daus is the right move to make to help gain confidence and understanding of complex subjects in a welcoming and encouraging environment.</p>
                        <div className='quotation-bot' style={isMobile?{right: '-10px'}:{}}>"</div>
                    </div>
                </div>
            </div>
            <div className="review" style={isMobile?{flexDirection:"row"}:{flexDirection:'row',...desktopStyles}}>
            <div className="picture">
                    <img src="https://github.com/daus-s/portfolio/blob/main/public/Mohan.jpeg?raw=true" alt='Mira Mohan, graduate from Cal Poly SLO.'/>
                    <div className="caption"><span style={{fontWeight: 'bold',}}>Mira Mohan</span><span style={{fontStyle: 'italic',}}><br/>California Polytechnic San Luis Obispo '22</span></div>
                </div>
                <div className='wrapper'>
                    <div className='content'>
                        <div className='quotation-top' style={{right: 'calc(100% - 110px)'}}>"</div>
                            <p style={{marginLeft: '60px', }}>Daus explains well and is engaging when tutoring. He helped me in my Physics class and really tried to teach me concepts so I could effectively practice and understand.</p>
                        <div className='quotation-bot' style={{right: '-10px'}}>"</div>
                    </div>
                </div>
            </div>
        </div>
    );
}