import { useEffect, useState } from "react";
import { pegarPost } from "../api/api";
import { Typography, Image } from "antd";
import styled from '../Styles/SingleWiki.module.css'
import { Helmet } from "react-helmet";


const { Title } = Typography;

export default function SingleWiki() {
  const location = window.location.pathname.split('/')[2];
  const [dados, setDados] = useState({});
    
  useEffect(() => {
    if (location !== undefined) {
      pegarPost(setDados, location);}
  }, [location]);
  
    const conteudo = dados.content
    return (
      <>
      { dados.id !== undefined ? 
       <div className={styled.Container}>
       <Helmet>
        <title>{dados.metas['title']}</title>
        <meta name="description" content={dados.metas['description']}/>
        <meta name="robots" content={dados.metas['robots']} />
        <meta property="og:title" content={dados.metas['og:title']} />
        <meta property="og:description" content={dados.metas['og:description']} />
        <meta property="og:type" content={dados.metas['og:type']} />
        <meta property="og:site_name" content={dados.metas['og:site_name']} />
        <meta property="og:image" content={dados.metas['og:image']} />
       </Helmet>
        <header>
          <Title>{dados.title}</Title>
          <Title level={4} className={styled.h4}>{dados.headline}</Title>
        </header>
        <main>
          <Image className={styled.Image} src={dados.featured_media['large']} preview={false} />
          <div className={styled.Item} dangerouslySetInnerHTML={{__html: conteudo}} />
        </main>
        <footer>
          {dados.tags.map(({ id, name, link }) => (
            <p key={id}><a href={link}>{name}</a></p>
          ))}
          <p className={styled.Name}>{dados.author.name}</p>
          <div className={styled.Biografiph} dangerouslySetInnerHTML={{__html: dados.author.description}} />
        </footer>
      </div>
      : null }
      </>
    )
};
