import { Layout, Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function PaginaErrors() {
  const navigate = useNavigate()
  return(
    <Layout>
      <Result
      status="404"
      title="404"
      subTitle="Desculpe-me essa pagina não existe ou foi excluida"
      extra={<Button type="primary" onClick={() => (navigate('/'))}>Back Home</Button>}
    />
    </Layout>
    
  )
};
