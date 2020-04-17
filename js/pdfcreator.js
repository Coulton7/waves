function pdfCreator() {
  var orgName = document.getElementById('orgName');
  var orgPhone = document.getElementById('orgPhone');
  var orgEmail = document.getElementById('orgEmail');
  var orgWorkers = document.getElementById('orgWorkers');
  var roi = document.getElementById('roi');
  var orgType = document.getElementById('orgType').value;
  var orgTypeValue;
  if (document.getElementById('type1').checked) {
  orgTypeValue = document.getElementById('type1').value;
  }else if (document.getElementById('type2').checked) {
  orgTypeValue = document.getElementById('type2').value;
  }else if (document.getElementById('type3').checked) {
  orgTypeValue = document.getElementById('type3').value;
  }


  var docDefinition = {

    info: {
      title: 'POLICY TO PREVENT GLOBAL WARMING',
      subject: 'POLICY TO PREVENT GLOBAL WARMING'
    },

    pageMargins: [45, 100, 45, 60],

    footer:{
      margin:[45, 0, 45, 0],
      text:[
        'This policy is copyright free and any, or all of it can be adopted at will by any organisation. Create your own by visiting, https://www.aesseal.com/en/resources/industry-guides/policy-prevent-global-warming'
      ],
      style: 'subsmall'
    },

    header:
    {
      margin:[45, 20, 45, 0,],
      text: [
         'Printed on ',new Intl.DateTimeFormat('en-GB').format()
      ],
      style: 'small'
    },

    content: [{
        text: 'POLICY TO PREVENT GLOBAL WARMING\n\n',
        style: 'header'
      },
      {
        text: 'The health of the Earth is essential to not just business, but also species survival.\n\n',
        style: 'subheader'
      },
      {
        text: [
          'The Health, Safety and Welfare of all the stakeholders in our ', orgTypeValue ,' is the primary concern of the Board of ', orgName.value, '.\n\n'
        ]
      },
      {
        text: [
        'The ', orgTypeValue, ' has consistently put sustainability projects first for capital investment and has now decided to debate and publish a policy to prevent global warming through technological change and investment decisions.\n\n',
      ]
    },
      {
        ul:
        [
          'Any sustainability project will be given priority over any other capital investment with a similar Return on Investment.\n\n',
          {
            text: ['Any sustainability project with a reasonable chance of getting a Return on Investment of ', roi.value, ' or less, should be brought to the attention of the ', orgName.value, '.\n\n']
          },
          'A written decision on any such project is mandatory within 3 months of project submission.\n\n',
          {
            text: ['All global business heads have local spending authority. Any sustainability project with a higher value should be immediately referred to the Board of ', orgName.value, '.\n\n']
          },
          {
            text: ['As a Board we undertake to use our personal and corporate presence to influence policy makers to legislate the requirement for such a policy for all businesses with more than ', orgWorkers.value,  ' co-workers.\n\n']
          },
          'Current or potential supplier input is welcomed, including their use of the global hotline where necessary.\n\n'
        ],
      },
      {
        text: ['The Board of ', orgName.value, 'encourage employees and stakeholders to contact us by ', orgPhone.value, ' or by email on ', orgEmail.value, ' to assist with the discreet implementation of this policy where necessary.']
      }
    ],

    styles: {
      header: {
        fontSize: 26,
        alignment: 'center',
        color: '#002a5b',
        bold: true
      },
      subheader: {
        fontSize: 20,
        alignment: 'center',
        color: '#002a5b',
        bold: true
      },
      defaultStyle: {
        fontSize: 12
      }
    }
  };
  var pdf = pdfMake.createPdf(docDefinition).download('Policy-to-prevent-Global-Warming.pdf');
}

function pdfOpen() {
  var orgName = document.getElementById('orgName');
  var orgPhone = document.getElementById('orgPhone');
  var orgEmail = document.getElementById('orgEmail');
  var orgWorkers = document.getElementById('orgWorkers');
  var roi = document.getElementById('roi');
  var orgType = document.getElementById('orgType').value;
  var orgTypeValue;
  if (document.getElementById('type1').checked) {
  orgTypeValue = document.getElementById('type1').value;
  }else if (document.getElementById('type2').checked) {
  orgTypeValue = document.getElementById('type2').value;
  }else if (document.getElementById('type3').checked) {
  orgTypeValue = document.getElementById('type3').value;
  }
  var now = new Date();


  var docDefinition = {

    info: {
      title: 'POLICY TO PREVENT GLOBAL WARMING',
      subject: 'POLICY TO PREVENT GLOBAL WARMING'
    },

    pageMargins: [45, 100, 45, 60],

    footer:{
      margin:[45, 0, 45, 0],
      text:[
        'This policy is copyright free and any, or all of it can be adopted at will by any organisation. Create your own by visiting, https://www.aesseal.com/en/resources/industry-guides/policy-prevent-global-warming'
      ],
      style: 'subsmall'
    },

    header:
    {
      margin:[45, 20, 45, 0,],
      text: [
         'Printed on ',new Intl.DateTimeFormat('en-GB').format()
      ],
      style: 'small'
    },

    content: [{
        text: 'POLICY TO PREVENT GLOBAL WARMING\n\n',
        style: 'header'
      },
      {
        text: 'The health of the Earth is essential to not just business, but also species survival.\n\n',
        style: 'subheader'
      },
      {
        text: [
          'The Health, Safety and Welfare of all the stakeholders in our ', orgTypeValue ,' is the primary concern of the Board of ', orgName.value, '.\n\n'
        ]
      },
      {
        text: [
        'The ', orgTypeValue, ' has consistently put sustainability projects first for capital investment and has now decided to debate and publish a policy to prevent global warming through technological change and investment decisions.\n\n',
      ]
    },
      {
        ul:
        [
          'Any sustainability project will be given priority over any other capital investment with a similar Return on Investment.\n\n',
          {
            text: ['Any sustainability project with a reasonable chance of getting a Return on Investment of ', roi.value, ' or less, should be brought to the attention of the ', orgName.value, '.\n\n']
          },
          'A written decision on any such project is mandatory within 3 months of project submission.\n\n',
          {
            text: ['All global business heads have local spending authority. Any sustainability project with a higher value should be immediately referred to the Board of ', orgName.value, '.\n\n']
          },
          {
            text: ['As a Board we undertake to use our personal and corporate presence to influence policy makers to legislate the requirement for such a policy for all businesses with more than ', orgWorkers.value,  ' co-workers.\n\n']
          },
          'Current or potential supplier input is welcomed, including their use of the global hotline where necessary.\n\n'
        ],
      },
      {
        text: ['The Board of ', orgName.value, ' encourage employees and stakeholders to contact us by ', orgPhone.value, ' or by email on ', orgEmail.value, ' to assist with the discreet implementation of this policy where necessary.']
      }
    ],

    styles: {
      header: {
        fontSize: 26,
        alignment: 'center',
        color: '#002a5b',
        bold: true
      },
      subheader: {
        fontSize: 20,
        alignment: 'center',
        color: '#002a5b',
        bold: true
      },
      defaultStyle: {
        fontSize: 12
      },
      small:{
        fontSize: 10
      },
      subsmall:{
        fontSize: 8
      }
    }
  };

  var pdf = pdfMake.createPdf(docDefinition).open();

}
