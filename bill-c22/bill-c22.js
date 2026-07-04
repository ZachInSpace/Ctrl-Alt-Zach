const DEFAULT_SUBJECT =
  "Constituent Concern Regarding Bill C-22 and Cybersecurity";

const representativeNameInput = document.getElementById("representativeName");
const senderNameInput = document.getElementById("senderName");
const senderLocationInput = document.getElementById("senderLocation");
const recipientEmailInput = document.getElementById("recipientEmail");

const emailSubjectInput = document.getElementById("emailSubject");
const emailBodyTextarea = document.getElementById("emailBody");

const copyEmailButton = document.getElementById("copyEmailButton");
const openEmailButton = document.getElementById("openEmailButton");
const resetButton = document.getElementById("resetButton");
const copyStatus = document.getElementById("copyStatus");
const currentYear = document.getElementById("currentYear");

function valueOrFallback(input, fallback) {
  const value = input.value.trim();
  return value || fallback;
}

function buildEmailBody() {
  const representativeName = valueOrFallback(
    representativeNameInput,
    "[Representative Name]"
  );

  const senderName = valueOrFallback(senderNameInput, "[Your Name]");
  const senderLocation = valueOrFallback(
    senderLocationInput,
    "[Postal Code / Constituency]"
  );

  return `Dear ${representativeName},

I am writing as a constituent to express serious concern about Bill C-22, the Lawful Access Act, 2026, particularly Part 2 and the Supporting Authorized Access to Information Act.

I support effective, lawful investigations and giving law enforcement and national-security agencies the resources they need to protect Canadians. My concern is with legislation that can require electronic service providers to maintain or develop technical capabilities to facilitate privileged access to information.

From a cybersecurity perspective, any exceptional-access mechanism, privileged interface, or engineered access path creates additional attack surface. A legal safeguard is not the same thing as a technical safeguard: once a capability exists, it can be targeted by criminals, malicious insiders, and foreign intelligence services.

History gives us strong reasons for caution:

• In the Athens Affair, attackers covertly used lawful-intercept functionality in Vodafone Greece's network to spy on senior officials, including the Prime Minister.

• EternalBlue demonstrated how a state-developed cyber capability can escape control and be repurposed at global scale.

• The Salt Typhoon intrusions show that foreign state-linked actors are actively targeting telecommunications infrastructure.

Canada should not solve legitimate investigative challenges by creating technical requirements that could weaken the security of communications infrastructure used by citizens, businesses, critical infrastructure operators, and government.

I am asking you to oppose or demand fundamental amendments to Part 2 of Bill C-22. At minimum, any legislation should:

• explicitly protect strong end-to-end encryption;

• prohibit compelled exceptional-access, backdoor, key-escrow, or universal-access mechanisms;

• prohibit requirements that create or preserve systemic vulnerabilities;

• require independent cybersecurity and cryptographic review before technical-capability requirements take effect; and

• include meaningful transparency, independent oversight, and public reporting consistent with legitimate operational secrecy.

A warrant creates legal authority. It does not create technical isolation. Building privileged access into complex systems changes the threat model for everyone.

Please let me know your position on Part 2 of Bill C-22 and what steps you will take to ensure that lawful-access policy does not weaken Canadian cybersecurity and national security.

Sincerely,

${senderName}
${senderLocation}`;
}

function applyTemplate() {
  emailSubjectInput.value = DEFAULT_SUBJECT;
  emailBodyTextarea.value = buildEmailBody();
  copyStatus.textContent = "";
}

function updateTemplateFromFields() {
  emailBodyTextarea.value = buildEmailBody();
  copyStatus.textContent = "";
}

async function copyEmail() {
  const completeEmail = `Subject: ${emailSubjectInput.value.trim()}

${emailBodyTextarea.value}`;

  try {
    await navigator.clipboard.writeText(completeEmail);
    copyStatus.textContent = "Email copied to clipboard.";
  } catch (error) {
    emailBodyTextarea.focus();
    emailBodyTextarea.select();

    const copied = document.execCommand("copy");
    copyStatus.textContent = copied
      ? "Email body copied. Copy the subject line separately if needed."
      : "Copy failed. Select the text manually and copy it.";
  }
}

function openEmailApp() {
  const recipient = recipientEmailInput.value.trim();
  const subject = encodeURIComponent(emailSubjectInput.value.trim());
  const body = encodeURIComponent(emailBodyTextarea.value);

  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

function resetTemplate() {
  representativeNameInput.value = "";
  senderNameInput.value = "";
  senderLocationInput.value = "";
  recipientEmailInput.value = "";
  applyTemplate();
}

representativeNameInput.addEventListener("input", updateTemplateFromFields);
senderNameInput.addEventListener("input", updateTemplateFromFields);
senderLocationInput.addEventListener("input", updateTemplateFromFields);

copyEmailButton.addEventListener("click", copyEmail);
openEmailButton.addEventListener("click", openEmailApp);
resetButton.addEventListener("click", resetTemplate);

currentYear.textContent = new Date().getFullYear();

applyTemplate();
