import React from 'react';
import { Typography, Input, Checkbox, Pagination } from "antd";
import { useEffect, useState } from "react";
import { pegarSearch, pegarSearchCheckbox } from "../api/api";
import { Link } from 'react-router-dom';
import styled from '../Styles/Home.module.css'
import { Helmet } from 'react-helmet';

const { Search } = Input;
const { Title } = Typography;

export default function Home() {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dados, setDados] = useState({});
  var totalPage = 10;
  var data = [];

  useEffect(() => {
    if (search !== "") {
      if (checked === true) {
        pegarSearchCheckbox(setDados, search, currentPage);
      } else {
        pegarSearch(setDados, search, currentPage);
      }
    }
  }, [checked, search, currentPage])

  function onSearch(value) {
    setSearch(value);
  };

  function onChangeCheck(event) {
    setChecked(event.target.checked);
  };

  function onChangePage(page) {
    setCurrentPage(page);
  }
  if (dados !== {}) {
    data = dados.data;
  }
  if (dados.pages !== undefined) {
    totalPage = parseInt(dados.pages) * 10;
  }
  return (
    <div style={{ margin: '2rem' }}>
      <Title style={{ color: '#3E4C75', marginLeft: '37rem'}}>Home</Title>
      <div>
        <Search placeholder="input search text" onSearch={(value) => onSearch(value)} enterButton style={{ marginLeft: '22rem', width: '35rem' }} />
        <Checkbox onChange={onChangeCheck} style={{ marginLeft: '1rem', fontSize: '1rem', height: '3rem' }}>Mais Relevantes</Checkbox>
      </div>
      <div>
        {(dados !== {} || dados !== undefined) &&
          <>
            <main>
            <Helmet>
              <meta charSet="utf-8"/>
              <meta name="og:description" content="pesquisa no mejorconsalud.com" />
            </Helmet>
              {(data === []) ?
                <div>
                  <Title level={2}>Não existem artigos relacionados ao termo pesquisado!</Title>
                </div>
                :
                <div>
                 { data !== undefined &&
                  
                  data.map(({ id, title, headline, featured_media }) => (
                    <div key={id}> 
                      <div className={styled.Item}>
                        <div className={styled.ItemImage}>
                          <img src={featured_media['large']} alt={title}/>
                        </div>
                        <div className={styled.ItemContainer}>
                          <Title level={2}>{title}</Title>
                          <Title level={5}>{headline}</Title>
                          <Link to={`/posts/${id}`} className={styled.ItemLink}>Saiba mais</Link>
                        </div>
                      </div>
                  </div>
                  ))}
                </div>
              }
            </main>
            <footer>
              <Pagination style={{ marginLeft: '37.0rem'}}
                onChange={(event) => onChangePage(event)}
                total={totalPage}
              />
            </footer>
          </>
        }
      </div>
    </div>
  )
};
