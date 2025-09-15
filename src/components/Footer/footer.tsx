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
                    <img src="src/assets/img/_linlkedin.png" alt="img_linlkedin" />

                </a>
                <a
                    href="https://github.com/AlyneRegaladoMorales"
                    target="_blank"
                    rel="_github"
                >
                    <img src="src/assets/img/_github.png" alt="img_github" />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="_instagram"
                >
                    <img src="src/assets/img/_instagram.png" alt="img_instagram" />


                </a>
            </SocialLinks>
            <p>© {new Date().getFullYear()} DemoStore</p>
        </FooterContainer>
    );
};

export default Footer;