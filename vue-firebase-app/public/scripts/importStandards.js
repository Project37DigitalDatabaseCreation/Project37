const app = firebase.initializeApp({
    apiKey: "AIzaSyCfqZoAkpuSBfp9n9sN3RCyHPV5wmA6cxs",
    authDomain: "ser401-project-37.firebaseapp.com",
    databaseURL: "https://ser401-project-37.firebaseio.com",
    projectId: "ser401-project-37",
    storageBucket: "ser401-project-37.appspot.com",
    messagingSenderId: "46311260060",
    appId: "1:46311260060:web:1e381fb482afc30c955259"
  });

const db = app.firestore();

function addStandards1(docRef) {
  let standards = [];

  let data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 1,
    title: "Instructions make clear how to get started and where to find various course components.",
    annotation: "<p>Information posted at the beginning of the course provides a general course overview, presents the schedule of activities, guides the learner to explore the course site, and indicates what to do first, in addition to listing detailed navigational instructions for the whole course.</p><p>Instructors may choose to incorporate some of this information in the course syllabus. In this case, learners should be directed to the syllabus at the beginning of the course. A useful feature is a &quot;Read Me First&quot; or &quot;Start Here&quot; button or icon on the course home page, linking learners to start-up information.</p><p>Reviewers, use the first visit to the course to experience what new learners encounter on their first visit to the course. Look for clear directions on what to do first, where to find the syllabus, and how to navigate the course.</p><p>Examples of guidance to help learners get acquainted with the course:</p><ol><li>Clear statements about how to get started in the course</li><li>A course &quot;tour&quot;</li><li>A &quot;scavenger hunt&quot; or &quot;syllabus quiz&quot; assignment that leads learners through an exploration of the different parts of the course</li><li>An illustration, table, diagram, visual representation, or mind map that depicts the online and face-to-face portions of a blended course</li></ol><p><span style='font-weight:bold;'>Blended Courses:</span> Instructions in the online classroom make it clear to learners that the course is a blended course, with both online and face-to-face components and activities. Instructions specify the relationship between, and the requirements for, both the online and face-to-face portions of the course.</p>",
    points: 3,
    is_active: true
  };
  
  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 2,
    title: "Learners are introduced to the purpose and structure of the course.",
    annotation: "<p>Information is provided to help learners understand the purpose of the course and how the learning process is structured and carried out, including course schedule, delivery modalities (online or blended), modes of communication, types of learning activities, and how learning will be assessed.</p><p>Reviewers, consider whether this information is provided or reinforced in the course syllabus or other course documents or in areas with titles such as &quot;Course Introduction,&quot; &quot;Welcome from the Instructor,&quot; &quot;Start Here,&quot; &quot;Course Schedule,&quot; &quot;Course Outline,&quot; &quot;Course Map,&quot; &quot;Course Calendar,&quot; etc.</p><p><span style='font-weight:bold;'>Blended Courses:</span> The purpose of both the online and face-to-face portions of the course is clearly explained to learners to help them understand how and why both formats are important to the learning process. The course schedule or calendar fully covers both the online and face-to-face portions of the course and clearly specifies the dates, times, locations, and content of face-to-face class meetings.</p><p><span style='font-weight:bold;'>Competency-Based Courses:</span> In addition to the purpose of the competency-based course, the options available to competency-based learners to complete the course are clearly delineated through detailed instructions. Reviewers may look for this information in the course site or linked from the course site to the program website.</p>",
    points: 3,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 3,
    title: "Communication expectations for online discussions, email, and other forms of interaction are clearly stated.",
    annotation: "<p>Expectations for how learners are to communicate online and in the classroom are clearly stated. (Such expectations are sometimes referred to as “netiquette.”) Types of communication include email, discussion forums, assignments, and other interactions or collaborations.</p><p>Since learner behavior is culturally influenced, it is important to be explicit about expectations for communication that apply in the course. The substance of communication expectations is not to be evaluated.</p><p>Examples of communication expectations:</p><ol><li>Professional and respectful tone and civility are used in communicating with fellow learners and the instructor, whether the communication is by electronic means or by telephone or face-to-face.</li><li>Written communication, both formal and informal, uses Standard English rather than popular online abbreviations and regional colloquialisms.</li><li>Video interactions reflect a respectful tone in verbal communications and body language.</li><li>Spelling and grammar are correct.</li></ol><p>To reinforce civility in communication, the instructor may provide a link or reference to the institution’s student handbook or code of conduct.</p>",
    points: 2,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 4,
    title: "Course and institutional policies with which the learner is expected to comply are clearly stated within the course, or a link to current policies is provided.",
    annotation: "<p>The number and type of policies vary by instructor or institution.</p><p>Look for links to the student handbook or other institution-wide policy publications and determine that all policies that apply to learners are stated or linked in the course. Check the Course Worksheet to determine whether policies are available to learners through an institutional portal rather than within the course.</p><p>Commonly established policies may address such matters as student conduct, academic integrity, late submission of assignments, the grade of &quot;Incomplete,&quot; withdrawal without penalty, confidentiality in the classroom, student grievances, electronic communication, proctoring, accessibility (see also Specific Review Standard 7.2), etc. Confirm that the policies are clearly explained. The substance and number of policies are not to be evaluated. The number of policies does not determine whether Specific Review Standard 1.4 is met.</p><p>Reviewers, as academic integrity and late submission policies are especially important, suggest inclusion of these policies if they are not found in the course.</p>",
    points: 2,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 5,
    title: "Minimum technology requirements for the course are clearly stated, and information on how to obtain the technologies is provided.",
    annotation: "<p>Learners are provided with detailed, clearly worded information regarding the technologies they will need throughout the course, including information on where they can be obtained. The word &quot;technologies&quot; covers a wide range, including hardware, software, subscriptions, plug-ins, and mobile applications (apps).</p><p>The hardware and peripherals necessary to complete all course activities are clearly listed. Learners are provided guidance about which course activities may be completed with different types of hardware (mobile devices vs. desktop computers). Fully functional software may need to be used on desktop computers instead of on mobile devices.</p><p>Peripherals include webcams, microphones, etc. If specific peripheral devices are needed for course completion, instructions are provided on how to obtain the peripheral devices.</p><p>The software chosen for the course is easily obtainable via download and available on a variety of platforms (Windows, MacOS, Android, iOS, etc.) whenever possible. If software is available on only one platform, students are notified about the specific limitations and required use.</p><p>Examples of information to include in a technology requirements statement:</p><ol><li>If speakers, a microphone, or a headset are necessary, the need for such peripherals is clearly stated.</li><li>Links to all downloadable resources are provided. These resources include software and online tools, apps, plug-ins such as Acrobat Reader and Java, media players, MP3 players, wikis, social media, interactive multimedia apps, etc.</li><li>Instructions are provided for how to access materials available through subscription services, including online journals or databases. When available, links are also provided.</li><li>If publisher materials are required, clearly stated instructions for how to obtain and use any required access codes are provided.</li></ol><p>In determining whether this Specific Review Standard is met, confirm that minimum requirements are stated and clear instructions are provided for obtaining the technologies.</p>",
    points: 2,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 6,
    title: "Computer skills and digital information literacy skills expected of the learner are clearly stated.",
    annotation: "<p>General as well as course-specific technical skills learners must have to succeed in the course are specified.</p><p>Examples of technical skills might include:</p><ol><li>Using the learning management system</li><li>Using email with attachments</li><li>Creating and submitting files in commonly used word processing program formats</li><li>Downloading and installing software</li><li>Using spreadsheet programs</li><li>Using presentation and graphics programs</li><li>Using apps in digital devices</li><li>Using web conferencing tools and software</li></ol><p>Digital information literacy refers to the ability to locate, evaluate, apply, create, and communicate knowledge using technology.</p><ol><li>Using online libraries and databases to locate and gather appropriate information</li><li>Using computer networks to locate and store files or data</li><li>Using online search tools for specific academic purposes, including the ability to use search criteria, keywords, and filters</li><li>Properly citing information sources</li><li>Preparing a presentation of research findings</li></ol>",
    points: 1,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 7,
    title: "Expectations for prerequisite knowledge in the discipline and/or any required competencies are clearly stated.",
    annotation: "<p>Information about prerequisite knowledge and/or competencies is found within the course, in documents linked to the course, or in supporting material provided to the learner by another means. Look for a link to that information or a reminder of it for the learner.</p><p>Discipline-specific knowledge prerequisites specify other courses that would enable the learner to meet the requirements.</p>",
    points: 1,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 8,
    title: "The self-introduction by the instructor is professional and is available online.",
    annotation: "<p>The initial introduction creates a sense of connection between the instructor and the learners. It presents the instructor as professional as well as approachable and includes basic information such as the instructor’s name, title, photo or other visual representation, field of expertise, email address, phone number, and virtual office hours. Reviewers, look for a self-introduction that is professional in content and tone and that includes contact information.</p><p>The self-introduction helps learners get to know the instructor and, in addition to the information mentioned above, could include:</p><ol><li>Comments on teaching philosophy</li><li>A summary of past experience with teaching online courses</li><li>Personal information such as hobbies, family, travel experiences, etc.</li><li>A graphic representation, audio message, or video (including alternative formats to ensure accessibility)</li><li>The role of the instructor</li><li>How the instructor prefers to be addressed</li></ol><p><span style='font-weight: bold;'>Blended Courses:</span> The instructor’s self-introduction is available electronically for learners.</p><p><span style='font-weight: bold;'>Competency-Based Courses:</span> The learner’s primary faculty or staff contact authors the self-introduction. The roles of instructor, facilitator, coach, mentor, assessor, tutor, or other staff who support the competency-based learner are clearly described. More than one self-introduction may be needed if learners are expected to contact different individuals for guidance on different aspects of the course.</p>",
    points: 1,
    is_active: true
  };

  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 9,
    title: "Learners are asked to introduce themselves to the class.",
    annotation: "<p>Learner introductions at the beginning of the class help to create a welcoming learning environment and a sense of community. Learners are asked to introduce themselves and are given guidance on where and how they should do so.</p><p>In a few situations, such as when a class is very large, learner introductions may not be feasible. Instructors are asked to indicate in the Course Worksheet if there is a reason for not providing an opportunity for learner introductions.</p><p>Instructors may ask learners to respond to specific questions (such as why they are taking the course, what are their strategies for success, what concerns they have, what they expect to learn, etc.) or may choose to let the learner decide what to include. Instructors may provide an example of an introduction or start the process by introducing themselves. Instructors may give learners the opportunity to represent themselves by text, audio, or visual means.</p><p><span style='font-weight: bold;'>Blended Courses:</span> The opportunity for introductions is available online for future reference, even if learners have introduced themselves in a face-to-face meeting.</p>",
    points: 1,
    is_active: true
  };

  standards.push(data);

  standards.forEach(standard => {
    db.collection("Standards").add(standard)
    .then(function(docRef) {
      console.log("Standard written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });  
};

function addStandards2(docRef) {
  let standards = [];

  let data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 1,
    title: "The course learning objectives, or course/program competencies, describe outcomes that are measurable.",
    annotation: "<p><span style='font-weight: bold;'>Alignment:</span> The concept of alignment is intended to convey the idea that critical course components work together to ensure that learners achieve the desired learning outcomes. Measurable course and module/unit-level learning objectives or competencies form the basis of alignment in a course. Other elements of the course, including those addressed in Specific Review Standards 2.2, 3.1, 4.1, 5.1, and 6.1, contribute to the accomplishment of the learning objectives or competencies.</p><p>Measurable course learning objectives or competencies precisely and clearly describe what learners will learn and be able to do if they successfully complete the course. Course objectives or competencies describe desired learner mastery using terms that are specific and observable enough to be measured by the instructor. At some institutions, learning objectives or competencies may be called “learning outcomes.” See the Glossary for a distinction between these two terms.</p><p>If the Course Worksheet indicates institutionally mandated learning objectives/competencies are used in the course, see Special Situations at the end of this Annotation for directions.</p><p>Examples of measurable learning outcomes or competencies:</p><p>Upon completion of the course (module/unit), learners will be able to:</p><ol><li>Select appropriate tax strategies for different financial and personal situations.</li><li>Develop a comprehensive, individualized wellness action program focused on overcoming a sedentary life-style.</li><li>Demonstrate correct use of personal protective equipment.</li><li>Articulate personal attitudes and values related to the use of medical marijuana.</li><li>Apply microeconomic principles to explain why environmental problems occur.</li><li>Create original musical compositions using computer technology.</li><li>Analyze a business situation to determine an information management need.</li></ol><p>Examples of learning outcomes or competencies that are not measurable:</p><p>Upon completion of the course (module/unit), learners will be able to:</p><ol><li>Understand the nature of reasoning.</li><li>Demonstrate understanding of the role of digital marketing.</li><li>Know basic statistical vocabulary and appropriate data collection methods.</li><li>Learn the basic elements of a media production software interface.</li><li>Be aware of the grammar conventions of standard American English.</li><li>Realize the significance of recent advances in genetic research.</li><li>Demonstrate an appreciation of contemporary art.</li></ol><p>These types of learning outcomes are very difficult, if not impossible, to measure.</p><p>Reviewers, look for measurable learning objectives or competencies that describe what learners will be able to do once they &quot;understand&quot; or &quot;know&quot; or &quot;realize&quot; a concept in the course. For example, a learning objective or competency that calls for the learner to &quot;understand the nature of reasoning&quot; could become a measurable learning objective or competency by recommending that &quot;understand&quot; be replaced by the verb &quot;explain&quot;: &quot;Explain the nature of reasoning.&quot;</p><p>In a course in which learners are expected to demonstrate &quot;core competencies,&quot; such as analytical skills or ability to express themselves effectively in writing or in other forms of communication, the course includes a reference to these foundational, core objectives or competencies in addition to objectives or competencies that relate to course-specific mastery of content. For instance, if the institution has a writing-across-the-curriculum requirement, the instructor of a course in economics may be expected to evaluate the effectiveness of learners’ writing as well as their mastery of principles of economics. Accordingly, objectives or competencies related to writing effectiveness will be included in the course.</p><p>In addition to measurable objectives or competencies, a course may have objectives or competencies or desired outcomes that are not easily measured, such as increased awareness of, sensitivity to, or interest in certain issues or subjects, or ability to work as a team member on a group project. Such objectives or competencies cannot be substituted for measurable objectives or competencies when determining whether Specific Review Standard 2.1 is met. In order for the Specific Review Standard to be met, a majority (85%) of the course-level objectives or competencies must be measurable.</p><p><span style='font-weight: bold;'>Special Situations:</span> In some cases (check the Course Worksheet), the course objectives or competencies are institutionally mandated, and the individual instructor does not have the authority to change them. If the institutionally mandated learning objectives or competencies are not measurable, make note of it in your recommendations. Write specific suggestions for improvement that can be used at the institution level to frame objectives or competencies in terms that are measurable. If the course objectives or competencies are institutionally mandated, then the reviewer may need to consider Specific Review Standard 2.1 in conjunction with Specific Review Standard 2.2, as follows:</p><p>Specific Review Standard 2.1 is MET under either of the following circumstances:</p><ol><li>The course objectives or competencies are measurable, whether set by the institution or by the instructor.</li><li>The institutionally mandated course objectives or competencies are not measurable, but the instructor-written module/unit-level objectives or competencies are measurable and aligned with the course objectives or competencies.</li></ol><p>Specific Review Standard 2.1 is NOT MET under any of the following circumstances:</p><ol><li>There are no stated course objectives or competencies.</li><li>The course objectives or competencies set by the instructor are not measurable.</li><li>The institutionally mandated course objectives or competencies are not measurable, and the instructor-written module/unit-level objectives or competencies are either not measurable or not present.</li></ol><p>If Specific Review Standard 2.1 is not met, it is not possible to complete the course review. If you determine this Specific Review Standard is &quot;Not Met,&quot; consult with the Team Chair before proceeding with your review. In such a case, the review is suspended and the Team Chair consults the Course Representative to clarify whether or not the matter can be quickly addressed so the review can continue.</p>",
    points: 3,
    is_active: true
  };
  
  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 2,
    title: "The module/unit learning objectives or competencies describe outcomes that are measurable and consistent with the course-level objectives or competencies.",
    annotation: "<p><span style='font-weight: bold;'>Alignment:</span> The concept of alignment is intended to convey the idea that critical course components work together to ensure that learners achieve the desired learning outcomes. Measurable module/unit-level learning objectives or competencies form the basis of alignment in a course because they are consistent with the course-level objectives or competencies (2.1). Objectives or competencies explain how learners will be assessed (3.1). Instructional materials (4.1), learning activities (5.1), and tools used in the course (6.1) contribute to the accomplishment of the learning objectives or competencies.</p><p>Learning objectives or competencies at the module/unit-level align with and are more specific than course objectives or competencies. The module/unit-level learning objectives or competencies describe learner mastery in specific, observable terms and in smaller, discrete pieces. The objectives or competencies precisely describe the specific competencies, skills, and knowledge learners are able to master and demonstrate at regular intervals throughout the course. The module/unit-level objectives or competencies may either implicitly or explicitly be aligned with the course-level objectives or competencies. If alignment is not clear, consult with Subject Matter Expert on the team to determine alignment.</p><p>Here is an example of a set of module/unit-level objectives or competencies that aligns with a course objective or competency:</p><table style='border: 1px solid black; border-collapse: collapse;'><tr><th style='border: 1px solid black;'>Course Objective or Competency</th><th style='border: 1px solid black;'>Module Objectives or Competencies</th></tr><tr><td style='border: 1px solid black;'>Upon completion of this course, learners will be able to apply the rules of punctuation.</td><td style='border: 1px solid black;'><ol><li>Learners will write sentences that correctly use commas, semLearners will write sentences that correctly use commas, semicolons, and periods.</li><li>Learners will use apostrophes when, and only when, needed.</li><li>Learners will use double and single quotation marks correctly in quoted material.</li></ol></td></tr></table><p>Module or unit objectives or competencies may be written by the instructor or may come from one or more of the instructional materials. Regardless of origin, module or unit objectives or competencies must be measurable. At some institutions learning objectives or competencies may be referred to as &quot;learning outcomes.&quot;</p><p>Specific Review Standard 2.2 is MET under either of the following circumstances:</p><ol><li>The module or unit-level objectives or competencies are measurable and aligned with the course objectives or competencies.</li><li>The institutionally mandated course objectives or competencies are not measurable, but the instructor-written module/unit-level objectives or competencies are measurable and aligned with the course objectives or competencies.</li></ol><p>Specific Review Standard 2.2 is NOT MET under any of the following circumstances:</p><ol><li>There are no stated module or unit-level objectives or competencies.</li><li>The module or unit-level learning objectives or competencies set by the instructor are not measurable.</li><li>The institutionally mandated course objectives or competencies are not measurable, and the instructor-written module/unit-level objectives or competencies are measurable but do not align with the course objectives or competencies.</li></ol><p>If Specific Review Standard 2.2 is NOT MET, it is not possible to complete the course review. If you determine this Specific Review Standard is &quot;Not Met,&quot; consult with the Team Chair before proceeding with your review. In such a case, the review is suspended and the Team Chair consults the Course Representative to clarify whether or not the matter can be quickly addressed so the review can continue.</p>",
    points: 3,
    is_active: true
  };
  
  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 3,
    title: "Learning objectives or competencies are stated clearly, are written from the learner’s perspective, and are prominently located in the course.",
    annotation: "<p>The course and module/unit-level learning objectives or competencies are stated clearly and prominently in the online classroom. The learning objectives or competencies are written in a way that allows learners, including non-native speakers, to easily grasp their meaning and the learning outcomes expected. The use of educational or discipline jargon, unexplained terminology, and unnecessarily complex language is avoided.</p><p>The course-level objectives or competencies are typically articulated in the course introduction or syllabus. Module/Unit-level learning objectives or competencies are prominently stated in the corresponding module or unit so they are available to the learner from within the online classroom.</p><p>Confirm all three parts of the Specific Review Standard are met. If only one part of the Specific Review Standard is met, the Specific Review Standard is not met.</p><p><span style='font-weight: bold;'>Blended Courses:</span> In addition to being provided in the face-to-face classroom, the learning objectives or competencies are stated in the online classroom.</p>",
    points: 3,
    is_active: true
  };

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 4,
    title: "The relationship between learning objectives or competencies and learning activities is clearly stated.",
    annotation: "<p>Confirm that the connection between the learning objectives and assigned learning activities is clearly explained. Making explicit the relationship between learning objectives or competencies and learning activities enables learners to understand that achieving the stated learning objectives or competencies is the reason they are being asked to complete the required learning activities. The learning activities should not be seen as arbitrary or unconnected; their purpose in the course is explained in terms of the learning objectives or competencies.</p><p>Examples of course components that clarify the relationship:</p><ol><li>A course map shows how the learning objectives or competencies connect to the learning activities.</li><li>A module or unit introductory page is provided with a summary or overview of module- or unit-level learning objectives or competencies, related course-level learning objectives or competencies, and course activities (learning activities, assessments, and use of instructional materials).</li><li>An explanation is provided for how the course-level and module- or unit-level learning objectives or competencies are met through each learning activity.</li><li>A numbering system demonstrates the relationship between course-level objectives or competencies, module- or unit-level objectives or competencies, and learning activities.</li></ol><p>A course map or numbering system is not required for this Specific Review Standard to be met. However, if a course map or numbering system is used in the course, the review team verifies that the course design reflects the mapping or numbering system accurately for the entirety of the course.</p><p>Reviewers, consider both the course and module or unit learning objectives or competencies in your review of this Specific Review Standard. Look for information indicating which learning activities, instructional materials, assignments, and assessments support specific learning objectives or competencies. Learning objectives or competencies are usually reiterated throughout the course with their corresponding learning activities.</p><p>&quot;Learning activities&quot; are those activities that help learners meet the learning objectives. All &quot;learning activities&quot; are &quot;course activities&quot;; however, not all &quot;course activities&quot; are &quot;learning activities.&quot; Some activities, like downloading software or creating presence through introductions, would be &quot;course activities&quot; that are not necessarily &quot;learning activities.&quot;</p><p>See Specific Review Standard 4.2 regarding instructions to learners on how to use the instructional materials to meet the learning objectives or competencies. The relationship between course objectives or competencies and learning activities is discussed in Specific Review Standard 5.1 as well.</p>",
    points: 3,
    is_active: true
  };
  
  standards.push(data);

  data = {
    general_standard_ref: db.doc('GeneralStandards/' + docRef.id),
    number: 5,
    title: "The learning objectives or competencies are suited to the level of the course.",
    annotation: "<p>Expected content mastery is appropriate to the type and level of the course. Taxonomies that describe levels of learning can be helpful to reviewers in determining whether the objectives or competencies correspond to the level of the course.</p><p>For example, while the course may start with objectives or competencies that are lower in the cognitive realm, as the course proceeds they progress to a higher level that is suited to the level of the course (introductory, intermediate, or advanced) for that topic.</p><p>In addition to content-specific objectives or competencies, introductory courses may address core learning skills. Core learning skills, including critical thinking, information literacy, and technology skills, are typically those that transcend an individual course and are integrated across the curriculum. Core learning skills are sometimes called &quot;core competencies.&quot;</p><p>Reviewers, examine the course and module or unit learning objectives or competencies for the course as a whole to ensure they describe knowledge and skills that correspond to the course level.</p><p>It is important to note that lower-division courses will not exclusively include taxonomies from the lowest cognitive levels, and upper-division or graduate level courses will not exclusively use taxonomies from the highest cognitive levels. For example, a Speech 101 course might start with a lower-level learning objective like &quot;Distinguish between a persuasive and informative speech&quot; and progress to a higher-level one such as &quot;Deliver a persuasive speech&quot; within the same course.</p><p>Evaluating content mastery expectations may be difficult for reviewers whose expertise is not in the course discipline. Reviewers should apply professional judgment, experience, and their understanding of taxonomies of learning to determine if the stated learning objectives or competencies are suited to the course level. Reviewers with questions about the alignment of learning objectives or competencies with the level of the course should consult with the Subject Matter Expert on the review team.</p>",
    points: 3,
    is_active: true
  };
  
  standards.push(data);

  standards.forEach(standard => {
    db.collection("Standards").add(standard)
    .then(function(docRef) {
      console.log("Standard written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });  
};

let data = {
  number: 1,
  title: "Course Overview and Introduction",
  description: "The overall design of the course is made clear to the learner at the beginning of the course.",
  annotation: "The course overview and introduction set the tone for the course, let learners know what to expect, and provide other guidance to help learners succeed from the outset."
};

db.collection("GeneralStandards").add(data)
.then(function(docRef) {  
  console.log("General Standard written with ID: ", docRef.id);
  addStandards1(docRef);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

data = {
  number: 2,
  title: "Learning Objectives (Competencies)",
  description: "Learning objectives or competencies describe what learners will be able to do upon completion of the course.",
  annotation: "The learning objectives or competencies establish a foundation upon which the rest of the course is based."
};

db.collection("GeneralStandards").add(data)
.then(function(docRef) {  
  console.log("General Standard written with ID: ", docRef.id);
  addStandards2(docRef);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});