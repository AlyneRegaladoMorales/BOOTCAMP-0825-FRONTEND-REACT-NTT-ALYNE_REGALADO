import { IMAGES } from "../../utils/Images";
import { FooterContainer, SocialLinks } from "./footer.style";

const Footer = () => {
    return (
        <FooterContainer>
            <SocialLinks>
                <a
                    href="https://www.linkedin.com/in/alyne-regalado/"
                    target="_blank"
                    rel="_linlkedin"
                >
                    <img src={IMAGES.LINKEDIN} alt="img_linlkedin" />

                </a>
                <a
                    href="https://github.com/AlyneRegaladoMorales"
                    target="_blank"
                    rel="_github"
                >
                    <img src={IMAGES.GITHUB} alt="img_github" />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="_instagram"
                >
                    <img src={IMAGES.INSTAGRAM} alt="img_instagram" />


                </a>
            </SocialLinks>
            <p>© {new Date().getFullYear()} DemoStore</p>
        </FooterContainer>
    );
};

export default Footer;