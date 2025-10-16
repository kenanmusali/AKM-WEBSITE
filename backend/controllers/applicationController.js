const Application = require('../models/Application');
const transporter = require('../config/email');

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, jobTitle, firstName, profession, mobile, cvText, email, linkedin } = req.body;

    if (!jobId || !jobTitle || !firstName || !email) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const application = new Application({
      jobId,
      jobTitle,
      firstName,
      profession,
      mobile,
      cvText,
      email,
      linkedin
    });

    await application.save();

    const generateTableRow = (label, value, isEven = false) => {
      if (!value || value.trim() === '') return '';
      
      const bgColor = isEven ? 'background-color: #f2f2f2;' : '';
      return `
        <tr style="${bgColor}">
          <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; width: 30%;">${label}:</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${value}</td>
        </tr>
      `;
    };

    let tableRows = '';
    let rowCount = 0;
    
    tableRows += generateTableRow('Müraciət edilən vəzifə', jobTitle, rowCount % 2 === 0);
    rowCount++;
    
    tableRows += generateTableRow('Ad, Soyad', firstName, rowCount % 2 === 0);
    rowCount++;
    
    tableRows += generateTableRow('Email', email, rowCount % 2 === 0);
    rowCount++;
    
    if (mobile && mobile.trim() !== '') {
      tableRows += generateTableRow('Telefon', mobile, rowCount % 2 === 0);
      rowCount++;
    }
    
    if (linkedin && linkedin.trim() !== '') {
      tableRows += generateTableRow('LinkedIn', linkedin, rowCount % 2 === 0);
      rowCount++;
    }
    
    if (cvText && cvText.trim() !== '') {
      tableRows += generateTableRow('Qeyd etmək istədiyiniz digər məlumatlar', cvText, rowCount % 2 === 0);
      rowCount++;
    }
    
    if (profession && profession.trim() !== '') {
      tableRows += generateTableRow('Müraciət etmək istədiyiniz peşə və ya sahə', profession, rowCount % 2 === 0);
      rowCount++;
    }
    
    tableRows += `
      <tr style="background-color: #f2f2f2;">
        <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold;">Tarix:</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${new Date().toLocaleString()}</td>
      </tr>
    `;

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <h2 style="color: #333; font-family: Arial, sans-serif;">Yeni namizəd müraciəti qəbul edilmişdir</h2>
        <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #ddd;">
          ${tableRows}
        </table>
      `,
      attachments: req.file
        ? [{ filename: req.file.originalname, content: req.file.buffer }]
        : []
    };

    const userMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Application Received',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Hörmətli namizəd,</h2>
          <p>Müraciətiniz Abşeron Logistika Mərkəzinin CV portalı vasitəsilə uğurla qəbul edilmişdir.</p>
          <p>Bildirmək istəyirik ki, vakansiya üçün müraciət mərhələsi bitdikdən sonra bütün müraciətlər nəzərdən keçiriləcək. </p>
          <p>Yalnız vakansiyanın tələblərinə uyğun hesab edilən namizədlərlə növbəti mərhələdə əlaqə saxlanılacaq. </p>
          <p>Digər namizədlərin müraciətləri isə məlumat bazasında saxlanılacaq və gələcək imkanlar üçün nəzərdən keçiriləcəkdir. </p>
          <p>Mərkəzimizə göstərdiyiniz marağa görə təşəkkür edirik.</p>
          <p>Hörmətlə,</p>
          <p>Abşeron Logistika Mərkəzi</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(userMailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ applicationDate: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch applications' });
  }
};