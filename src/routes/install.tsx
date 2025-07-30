import { createFileRoute, useParams, useSearch } from '@tanstack/react-router'
import { Card, Result, Row, Spin, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react';
import API from '../api/api';

export const Route = createFileRoute('/install')({
  component: RouteComponent,
})



function RouteComponent() {

  const searchParams = useSearch({
    from: '/install'
  }) as {
    code: string | null
  }
  const [installed, setInstalled] = useState<boolean | "error">(false);
  const [counter, setCounter] = useState(10);
  const counterRef = useRef(counter);

  useEffect(() => {
    if (!searchParams.code) return;
    const install = async () => {
      try {
        const client = await API()
        await client.InstallLiveChatApp({
          app_slug: import.meta.env.VITE_APP_SLUG,
          code: searchParams.code ??""
        })
        setInstalled(true)
      } catch (e) {
        console.log(e)
        setInstalled("error")
      }
    }
    install()
  }, [searchParams.code]);

  useEffect(() => {
    counterRef.current = counter; //sync the ref with the state
  }, [counter]);

  useEffect(() => {
    if (installed === true) {
      const interval = setInterval(() => {
        if (counterRef.current === 0) {
          window.close();
        } else {
          setCounter((prev) => {
            counterRef.current = prev - 1;
            return prev - 1;
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [installed]);

  return <div className=' h-full box-border w-[100%]'>
    
      {/* <PageWrapper> */}
      <Card style={{ marginTop: 40 }}>
        {installed === false && (
          <Result
            status={"info"}
            icon={<Spin size="large" spinning={true} />}
            title={"Installing"}
            subTitle={<>Please wait while we install the app.</>}
          />
        )}
        {installed === true && (
          <Result
            status={"success"}
            title={"Installed"}
            subTitle={
              <>
                You have successfully installed the app. You may now close
                this window and head to the main application screen.
                <br />
                <br />
                <Typography.Text type="secondary">
                  This window will automatically close in {counter} seconds
                </Typography.Text>
              </>
            }
          />
        )}
        {installed === "error" && (
          <Result
            status={"error"}
            title={"Error"}
            subTitle={"An error occurred while installing the app."}
          />
        )}
      </Card>
      {/* </PageWrapper> */}
    
  </div>
}
