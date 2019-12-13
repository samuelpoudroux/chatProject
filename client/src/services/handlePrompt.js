import prompt from "antd-prompt";

const handlerPrompt  = async (data) => {
      const result = await prompt({
        title: `Nouveau ${data}`,
        placeholder: `Merci de renseigner le nouveau ${data} que vous souhaitez rajouter`,
        rules: [
          // check this link for more help: https://ant.design/components/form/#Validation-Rules
          {
            required: false,
            message: `You must enter ${data}`
          }
        ]
      });
      if(result.length > 0 ) {
        return result
      } else {
        return result = ''
    }
  };

  export default handlerPrompt